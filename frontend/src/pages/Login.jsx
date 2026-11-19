import {useState} from 'react'
import {Link, Navigate, useNavigate, useLocation} from 'react-router-dom'
import {useAuth} from '../context/AuthContext.jsx'
import {validarLogin, hayErrores, erroresDeApi} from '../utils/validaciones.js'
import Campo from '../components/Campo.jsx'
import Aviso from '../components/Aviso.jsx'

function Login() {
    const [datos, setDatos] = useState({email: '', password: ''});
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);

    const {login, autenticado} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const destino = location.state?.from?.pathname || '/perfil';

    if (autenticado) {
        return <Navigate to={destino} replace/>
    }

    function handleChange(evento) {
        const {name, value} = evento.target;
        setDatos({...datos, [name]: value});
    }

    async function handleSubmitLogin(evento) {
        evento.preventDefault();
        const nuevosErrores = validarLogin(datos);
        setErrores(nuevosErrores);
        setMensaje('');

        if (hayErrores(nuevosErrores)) return;

        try {
            setCargando(true);
            await login(datos.email.trim(), datos.password);
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
                <h1>Iniciar sesión</h1>
                <p className="texto-intro">Ingresá para postularte a vacantes y seguir el estado de tus postulaciones.</p>

                <form className="contacto__formulario" onSubmit={handleSubmitLogin} noValidate>
                    <Aviso tipo="error">{mensaje}</Aviso>

                    <Campo
                        label="Correo electrónico"
                        name="email"
                        type="email"
                        obligatorio
                        placeholder="Ej: juan@email.com"
                        autoComplete="email"
                        value={datos.email}
                        onChange={handleChange}
                        error={errores.email}
                    />

                    <Campo
                        label="Contraseña"
                        name="password"
                        type="password"
                        obligatorio
                        autoComplete="current-password"
                        value={datos.password}
                        onChange={handleChange}
                        error={errores.password}
                    />

                    <button type="submit" className="btn" disabled={cargando}>
                        {cargando ? 'Ingresando...' : 'Ingresar'}
                    </button>

                    <p className="contacto__hint">
                        ¿No tenés cuenta? <Link to="/register" state={location.state} className="contacto__obligatorio">Creá una cuenta</Link>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Login
