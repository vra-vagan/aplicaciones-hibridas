import {Navigate, Outlet} from 'react-router-dom'
import {useAuth} from '../context/AuthContext.jsx'

function RoleRoute({rolesPermitidos}) {
    const {user, autenticado} = useAuth();

    if (!autenticado) {
        return <Navigate to="/login" replace/>
    }

    if (!rolesPermitidos.includes(user?.rol)) {
        return <Navigate to="/acceso-denegado" replace/>
    }

    return <Outlet/>
}

export default RoleRoute
