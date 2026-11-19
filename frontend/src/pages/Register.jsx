import {useState} from 'react'
import {Link, Navigate, useNavigate, useLocation} from 'react-router-dom'
import {useAuth} from '../context/AuthContext.jsx'
import {validarRegistro, hayErrores, erroresDeApi} from '../utils/validaciones.js'
import Campo from '../components/Campo.jsx'
import Aviso from '../components/Aviso.jsx'

const VACIO = {nombre: '', apellido: '', email: '', telefono: '', password: '', confirmPassword: ''};

function Register() {
    const [user, setUser] = useState(VACIO);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);

    const {registrar, autenticado} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const destino = location.state?.from?.pathname || '/perfil';

    if (autenticado) {
        return <Navigate to={destino} replace/>
    }

    function handleChange(evento) {
        const {name, value} = evento.target;
        setUser({...user, [name]: value});
    }

    async function handleSubmitRegister(evento) {
        evento.preventDefault();
        const nuevosErrores = validarRegistro(user);
        setErrores(nuevosErrores);
        setMensaje('');

        if (hayErrores(nuevosErrores)) return;

        const {confirmPassword, ...datos} = user;

        try {
            setCargando(true);
            await registrar({
                ...datos,
                nombre: datos.nombre.trim(),
                apellido: datos.apellido.trim(),
                email: datos.email.trim(),
                telefono: datos.telefono.trim() || undefined
            });
            navigate(destino, {replace: true});
        } catch (error) {
            setErrores(erroresDeApi(error));
            setMensaje(error.message);
        } finally {
            setCargando(false);
        }
    }

    return (
        <section>
            <div className="container">
                <h1>Crear una cuenta</h1>
                <p className="texto-intro">Registrate gratis para postularte a las vacantes de las mejores empresas.</p>

                <form className="contacto__formulario" onSubmit={handleSubmitRegister} noValidate>
                    <Aviso tipo="error">{mensaje}</Aviso>

                    <div className="campos-fila">
                        <Campo label="Nombre" name="nombre" obligatorio autoComplete="given-name"
                               value={user.nombre} onChange={handleChange} error={errores.nombre}/>
                        <Campo label="Apellido" name="apellido" obligatorio autoComplete="family-name"
                               value={user.apellido} onChange={handleChange} error={errores.apellido}/>
                    </div>

                    <Campo label="Correo electrónico" name="email" type="email" obligatorio autoComplete="email"
                           placeholder="Ej: juan@email.com" value={user.email} onChange={handleChange} error={errores.email}/>

                    <Campo label="Teléfono" name="telefono" type="tel" autoComplete="tel"
                           placeholder="Ej: +54 11 5555-0101" value={user.telefono} onChange={handleChange} error={errores.telefono}/>

                    <div className="campos-fila">
                        <Campo label="Contraseña" name="password" type="password" obligatorio autoComplete="new-password"
                               hint="Mínimo 6 caracteres" value={user.password} onChange={handleChange} error={errores.password}/>
                        <Campo label="Repetir contraseña" name="confirmPassword" type="password" obligatorio autoComplete="new-password"
                               value={user.confirmPassword} onChange={handleChange} error={errores.confirmPassword}/>
                    </div>

                    <button type="submit" className="btn" disabled={cargando}>
                        {cargando ? 'Creando cuenta...' : 'Registrarme'}
                    </button>

                    <p className="contacto__hint">
                        ¿Ya tenés cuenta? <Link to="/login" state={location.state} className="contacto__obligatorio">Iniciá sesión</Link>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Register
