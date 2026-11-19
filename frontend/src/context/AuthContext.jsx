import {createContext, useState, useContext, useEffect, useCallback} from 'react'
import {jwtDecode} from 'jwt-decode'
import {iniciarSesion, registrarUsuario} from '../service/auth.js'

const AuthContext = createContext(null);

const SIN_SESION = {token: null, user: null};

function obtenerSesion(token) {
    if (!token) {
        return SIN_SESION;
    }

    try {
        const payload = jwtDecode(token);

        if (!payload.exp || payload.exp * 1000 <= Date.now()) {
            return SIN_SESION;
        }

        const user = {
            id: payload.id,
            nombre: payload.nombre,
            rol: payload.rol
        };
        return {token, user};
    } catch (error) {
        console.error(error);
        return SIN_SESION;
    }
}

function restaurarSesion() {
    const sesion = obtenerSesion(sessionStorage.getItem('token'));

    if (!sesion.token) {
        sessionStorage.removeItem('token');
    }

    return sesion;
}

export function AuthProvider({children}) {
    const [sesion, setSesion] = useState(restaurarSesion);

    const guardarToken = useCallback((token) => {
        const nuevaSesion = obtenerSesion(token);

        if (!nuevaSesion.token) {
            throw new Error('El token es inválido o está vencido');
        }

        sessionStorage.setItem('token', nuevaSesion.token);
        setSesion(nuevaSesion);
    }, []);

    async function login(email, password) {
        const data = await iniciarSesion(email, password);

        if (!data.token) {
            throw new Error('No se recibió el token de la API');
        }

        guardarToken(data.token);
    }

    async function registrar(datos) {
        const data = await registrarUsuario(datos);
        guardarToken(data.token);
    }

    const logout = useCallback(() => {
        sessionStorage.removeItem('token');
        setSesion(SIN_SESION);
    }, []);

    useEffect(() => {
        window.addEventListener('sesion-expirada', logout);
        return () => window.removeEventListener('sesion-expirada', logout);
    }, [logout]);

    return (
        <AuthContext.Provider value={{
            token: sesion.token,
            user: sesion.user,
            autenticado: Boolean(sesion.token && sesion.user),
            esAdmin: sesion.user?.rol === 'admin',
            login,
            registrar,
            logout,
            guardarToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
