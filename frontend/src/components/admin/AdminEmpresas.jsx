import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useFetch} from '../../hooks/useFetch.js'
import {obtenerEmpleadores, eliminarEmpleador} from '../../service/empleadores.js'
import {urlImagen} from '../../service/api.js'
import Cargando from '../Cargando.jsx'
import Aviso from '../Aviso.jsx'

function AdminEmpresas({avisoInicial}) {
    const {data, setData, cargando, error} = useFetch(() => obtenerEmpleadores(), []);
    const [aviso, setAviso] = useState({tipo: avisoInicial ? 'exito' : '', texto: avisoInicial || ''});

    async function eliminar(empresa) {
        const confirmado = window.confirm(
            `¿Eliminar "${empresa.nombre}"? También se eliminarán sus ${empresa.cantidad_vacantes} vacantes y las postulaciones a ellas.`
        );
        if (!confirmado) return;

        try {
            const respuesta = await eliminarEmpleador(empresa._id);
            setData(data.filter((e) => e._id !== empresa._id));
            setAviso({
                tipo: 'exito',
                texto: `Empresa eliminada junto con ${respuesta.data.vacantes_eliminadas} vacantes y ${respuesta.data.postulaciones_eliminadas} postulaciones.`
            });
        } catch (err) {
            setAviso({tipo: 'error', texto: err.message});
        }
    }

    return (
        <>
            <div className="admin__barra">
                <h2>Empresas {data && `(${data.length})`}</h2>
                <Link to="/admin/empresas/nueva" className="btn">Nueva empresa</Link>
            </div>
            <Aviso tipo={aviso.tipo}>{aviso.texto}</Aviso>
            {cargando && <Cargando/>}
            <Aviso tipo="error">{error}</Aviso>
            {data && (
                <div className="tabla__contenedor">
                    <table className="tabla">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Ubicación</th>
                            <th>Email de contacto</th>
                            <th>Vacantes</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((empresa) => (
                            <tr key={empresa._id}>
                                <td><img className="vacante__logo" src={urlImagen(empresa.logo)} alt=""/></td>
                                <td><Link to={`/empresas/${empresa._id}`}>{empresa.nombre}</Link></td>
                                <td>{empresa.ubicacion}</td>
                                <td>{empresa.email_contacto}</td>
                                <td>{empresa.cantidad_vacantes}</td>
                                <td>
                                    <div className="tabla__acciones">
                                        <Link to={`/admin/empresas/${empresa._id}/editar`} className="btn btn--secundario btn--chico">Editar</Link>
                                        <button type="button" className="btn btn--peligro btn--chico" onClick={() => eliminar(empresa)}>Eliminar</button>
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

export default AdminEmpresas
