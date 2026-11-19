import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useFetch} from '../../hooks/useFetch.js'
import {obtenerVacantes, eliminarVacante} from '../../service/vacantes.js'
import {formatearSalario} from '../../utils/formato.js'
import {CATEGORIAS, MODALIDADES} from '../../utils/opciones.js'
import Cargando from '../Cargando.jsx'
import Aviso from '../Aviso.jsx'

function AdminVacantes({avisoInicial}) {
    const {data, setData, cargando, error} = useFetch(() => obtenerVacantes(), []);
    const [aviso, setAviso] = useState({tipo: avisoInicial ? 'exito' : '', texto: avisoInicial || ''});

    async function eliminar(vacante) {
        if (!window.confirm(`¿Eliminar la vacante "${vacante.titulo}"? También se eliminarán sus postulaciones.`)) return;

        try {
            const respuesta = await eliminarVacante(vacante._id);
            setData(data.filter((v) => v._id !== vacante._id));
            setAviso({
                tipo: 'exito',
                texto: `Vacante eliminada (${respuesta.data.postulaciones_eliminadas} postulaciones eliminadas).`
            });
        } catch (err) {
            setAviso({tipo: 'error', texto: err.message});
        }
    }

    return (
        <>
            <div className="admin__barra">
                <h2>Vacantes {data && `(${data.length})`}</h2>
                <Link to="/admin/vacantes/nueva" className="btn">Nueva vacante</Link>
            </div>
            <Aviso tipo={aviso.tipo}>{aviso.texto}</Aviso>
            {cargando && <Cargando/>}
            <Aviso tipo="error">{error}</Aviso>
            {data && (
                <div className="tabla__contenedor">
                    <table className="tabla">
                        <thead>
                        <tr>
                            <th>Título</th>
                            <th>Empresa</th>
                            <th>Categoría</th>
                            <th>Modalidad</th>
                            <th>Salario</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((vacante) => (
                            <tr key={vacante._id}>
                                <td>
                                    <Link to={`/vacantes/${vacante._id}`}>{vacante.titulo}</Link>
                                    {vacante.prioridad && <span className="tabla__sub">Prioridad</span>}
                                </td>
                                <td>{vacante.empleador?.nombre}</td>
                                <td>{CATEGORIAS[vacante.categoria]}</td>
                                <td>{MODALIDADES[vacante.modalidad]}</td>
                                <td>{formatearSalario(vacante.salario)}</td>
                                <td>
                                    <div className="tabla__acciones">
                                        <Link to={`/admin/vacantes/${vacante._id}/editar`} className="btn btn--secundario btn--chico">Editar</Link>
                                        <button type="button" className="btn btn--peligro btn--chico" onClick={() => eliminar(vacante)}>Eliminar</button>
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

export default AdminVacantes
