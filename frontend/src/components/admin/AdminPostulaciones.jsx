import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useFetch} from '../../hooks/useFetch.js'
import {obtenerPostulaciones, actualizarPostulacion, eliminarPostulacion} from '../../service/postulaciones.js'
import {formatearFecha} from '../../utils/formato.js'
import {ESTADOS} from '../../utils/opciones.js'
import Cargando from '../Cargando.jsx'
import Aviso from '../Aviso.jsx'

function AdminPostulaciones() {
    const [estado, setEstado] = useState('');
    const [aviso, setAviso] = useState({tipo: '', texto: ''});
    const {data, setData, cargando, error} = useFetch(() => obtenerPostulaciones({estado}), [estado]);

    async function cambiarEstado(postulacion, nuevoEstado) {
        try {
            const respuesta = await actualizarPostulacion(postulacion._id, {estado: nuevoEstado});
            setData(data.map((p) => (p._id === postulacion._id ? respuesta.data : p)));
            setAviso({tipo: 'exito', texto: `Estado actualizado a "${ESTADOS[nuevoEstado]}".`});
        } catch (err) {
            setAviso({tipo: 'error', texto: err.message});
        }
    }

    async function eliminar(postulacion) {
        if (!window.confirm('¿Eliminar esta postulación?')) return;

        try {
            await eliminarPostulacion(postulacion._id);
            setData(data.filter((p) => p._id !== postulacion._id));
            setAviso({tipo: 'exito', texto: 'Postulación eliminada.'});
        } catch (err) {
            setAviso({tipo: 'error', texto: err.message});
        }
    }

    return (
        <>
            <div className="admin__barra">
                <h2>Postulaciones {data && `(${data.length})`}</h2>
                <select value={estado} onChange={(evento) => setEstado(evento.target.value)} aria-label="Filtrar por estado">
                    <option value="">Todos los estados</option>
                    {Object.entries(ESTADOS).map(([valor, etiqueta]) => (
                        <option key={valor} value={valor}>{etiqueta}</option>
                    ))}
                </select>
            </div>
            <Aviso tipo={aviso.tipo}>{aviso.texto}</Aviso>
            {cargando && <Cargando/>}
            <Aviso tipo="error">{error}</Aviso>
            {data && !data.length && <p className="vacantes__vacio">No hay postulaciones.</p>}
            {data?.length > 0 && (
                <div className="tabla__contenedor">
                    <table className="tabla">
                        <thead>
                        <tr>
                            <th>Candidato</th>
                            <th>Vacante</th>
                            <th>Mensaje</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((postulacion) => (
                            <tr key={postulacion._id}>
                                <td>
                                    {postulacion.usuario?.nombre} {postulacion.usuario?.apellido}
                                    <span className="tabla__sub">{postulacion.usuario?.email}</span>
                                    {postulacion.perfil && (
                                        <a className="tabla__sub" href={postulacion.perfil} target="_blank" rel="noreferrer">Ver perfil</a>
                                    )}
                                </td>
                                <td>
                                    <Link to={`/vacantes/${postulacion.vacante?._id}`}>{postulacion.vacante?.titulo}</Link>
                                    <span className="tabla__sub">{postulacion.vacante?.empleador?.nombre}</span>
                                </td>
                                <td>{postulacion.mensaje}</td>
                                <td>{formatearFecha(postulacion.createdAt)}</td>
                                <td>
                                    <select
                                        value={postulacion.estado}
                                        onChange={(evento) => cambiarEstado(postulacion, evento.target.value)}
                                        aria-label="Estado de la postulación"
                                    >
                                        {Object.entries(ESTADOS).map(([valor, etiqueta]) => (
                                            <option key={valor} value={valor}>{etiqueta}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <div className="tabla__acciones">
                                        <button type="button" className="btn btn--peligro btn--chico" onClick={() => eliminar(postulacion)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default AdminPostulaciones
