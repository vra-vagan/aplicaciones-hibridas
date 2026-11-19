import {useState} from 'react'
import {useAuth} from '../../context/AuthContext.jsx'
import {useFetch} from '../../hooks/useFetch.js'
import {obtenerUsuarios, actualizarUsuario, eliminarUsuario} from '../../service/usuarios.js'
import {formatearFecha} from '../../utils/formato.js'
import {ROLES} from '../../utils/opciones.js'
import Cargando from '../Cargando.jsx'
import Aviso from '../Aviso.jsx'

function AdminUsuarios() {
    const {user} = useAuth();
    const {data, setData, cargando, error} = useFetch(() => obtenerUsuarios(), []);
    const [aviso, setAviso] = useState({tipo: '', texto: ''});

    async function cambiarRol(usuario, rol) {
        try {
            const respuesta = await actualizarUsuario(usuario._id, {rol});
            setData(data.map((u) => (u._id === usuario._id ? respuesta.data : u)));
            setAviso({tipo: 'exito', texto: `${usuario.nombre} ahora es ${ROLES[rol].toLowerCase()}.`});
        } catch (err) {
            setAviso({tipo: 'error', texto: err.message});
        }
    }

    async function eliminar(usuario) {
        if (!window.confirm(`¿Eliminar a ${usuario.nombre} ${usuario.apellido}? También se eliminarán sus postulaciones.`)) return;

        try {
            await eliminarUsuario(usuario._id);
            setData(data.filter((u) => u._id !== usuario._id));
            setAviso({tipo: 'exito', texto: 'Usuario eliminado.'});
        } catch (err) {
            setAviso({tipo: 'error', texto: err.message});
        }
    }

    return (
        <>
            <div className="admin__barra">
                <h2>Usuarios {data && `(${data.length})`}</h2>
            </div>
            <Aviso tipo={aviso.tipo}>{aviso.texto}</Aviso>
            {cargando && <Cargando/>}
            <Aviso tipo="error">{error}</Aviso>
            {data && (
                <div className="tabla__contenedor">
                    <table className="tabla">
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Alta</th>
                            <th>Rol</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((usuario) => {
                            const esYo = usuario._id === user.id;
                            return (
                                <tr key={usuario._id}>
                                    <td>{usuario.nombre} {usuario.apellido} {esYo && <span className="tabla__sub">Vos</span>}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.telefono || '—'}</td>
                                    <td>{formatearFecha(usuario.createdAt)}</td>
                                    <td>
                                        <select
                                            value={usuario.rol}
                                            disabled={esYo}
                                            onChange={(evento) => cambiarRol(usuario, evento.target.value)}
                                            aria-label="Rol del usuario"
                                        >
                                            {Object.entries(ROLES).map(([valor, etiqueta]) => (
                                                <option key={valor} value={valor}>{etiqueta}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <div className="tabla__acciones">
                                            <button type="button" className="btn btn--peligro btn--chico" disabled={esYo} onClick={() => eliminar(usuario)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default AdminUsuarios
