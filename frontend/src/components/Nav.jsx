import {NavLink, useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext.jsx'

const claseActiva = ({isActive}) => (isActive ? 'activo' : '');

function Nav() {
    const {user, autenticado, esAdmin, logout} = useAuth();
    const navigate = useNavigate();

    function cerrarSesion() {
        logout();
        navigate('/login');
    }

    return (
        <nav className="nav">
            <ul className="nav__lista">
                <li><NavLink to="/" end className={claseActiva}>Inicio</NavLink></li>
                <li><NavLink to="/vacantes" className={claseActiva}>Vacantes</NavLink></li>
                <li><NavLink to="/empresas" className={claseActiva}>Empresas</NavLink></li>
                {autenticado ? (
                    <>
                        {esAdmin && <li><NavLink to="/admin" className={claseActiva}>Panel admin</NavLink></li>}
                        <li><NavLink to="/perfil" className={claseActiva}>Hola, {user.nombre}</NavLink></li>
                        <li>
                            <button type="button" className="btn-link nav__salir" onClick={cerrarSesion}>Salir</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><NavLink to="/login" className={claseActiva}>Ingresar</NavLink></li>
                        <li><NavLink to="/register" className={claseActiva}>Crear cuenta</NavLink></li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Nav
