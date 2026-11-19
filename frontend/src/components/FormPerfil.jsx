import {useState} from 'react'
import Campo from './Campo.jsx'
import Aviso from './Aviso.jsx'
import {actualizarPerfil} from '../service/usuarios.js'
import {useAuth} from '../context/AuthContext.jsx'
import {validarPerfil, hayErrores, erroresDeApi} from '../utils/validaciones.js'
import {ROLES} from '../utils/opciones.js'

function FormPerfil({perfil, onActualizado}) {
    const {guardarToken} = useAuth();
    const [datos, setDatos] = useState({
        nombre: perfil.nombre,
        apellido: perfil.apellido,
        telefono: perfil.telefono || '',
        password: '',
        confirmPassword: ''
    });
    const [errores, setErrores] = useState({});
    const [aviso, setAviso] = useState({tipo: '', texto: ''});
    const [guardando, setGuardando] = useState(false);

    function handleChange(evento) {
        const {name, value} = evento.target;
        setDatos({...datos, [name]: value});
    }

    async function handleSubmit(evento) {
        evento.preventDefault();
        const nuevosErrores = validarPerfil(datos);
        setErrores(nuevosErrores);
        setAviso({tipo: '', texto: ''});

        if (hayErrores(nuevosErrores)) return;

        const cambios = {
            nombre: datos.nombre.trim(),
            apellido: datos.apellido.trim(),
            telefono: datos.telefono.trim()
        };
        if (datos.password) cambios.password = datos.password;

        try {
            setGuardando(true);
            const respuesta = await actualizarPerfil(cambios);
            guardarToken(respuesta.token);
            onActualizado(respuesta.data);
            setDatos({...datos, password: '', confirmPassword: ''});
            setAviso({tipo: 'exito', texto: 'Tus datos se actualizaron correctamente.'});
        } catch (error) {
            setErrores(erroresDeApi(error));
            setAviso({tipo: 'error', texto: error.message});
        } finally {
            setGuardando(false);
        }
    }

    return (
        <form className="contacto__formulario" onSubmit={handleSubmit} noValidate>
            <Aviso tipo={aviso.tipo}>{aviso.texto}</Aviso>

            <Campo label="Correo electrónico" name="email" value={perfil.email} readOnly hint={`Rol: ${ROLES[perfil.rol]}`}/>
            <Campo label="Nombre" name="nombre" obligatorio value={datos.nombre} onChange={handleChange} error={errores.nombre}/>
            <Campo label="Apellido" name="apellido" obligatorio value={datos.apellido} onChange={handleChange} error={errores.apellido}/>
            <Campo label="Teléfono" name="telefono" type="tel" value={datos.telefono} onChange={handleChange} error={errores.telefono}/>
            <Campo label="Nueva contraseña" name="password" type="password" autoComplete="new-password"
                   hint="Dejala vacía para mantener la actual" value={datos.password} onChange={handleChange} error={errores.password}/>
            <Campo label="Repetir nueva contraseña" name="confirmPassword" type="password" autoComplete="new-password"
                   value={datos.confirmPassword} onChange={handleChange} error={errores.confirmPassword}/>

            <button type="submit" className="btn" disabled={guardando}>
                {guardando ? 'Guardando...' : 'Guardar cambios'}
            </button>
        </form>
    )
}

export default FormPerfil
