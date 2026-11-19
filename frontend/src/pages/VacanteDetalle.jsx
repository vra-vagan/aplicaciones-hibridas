import {Link, useParams} from 'react-router-dom'
import {useAuth} from '../context/AuthContext.jsx'
import {useFetch} from '../hooks/useFetch.js'
import {obtenerVacante} from '../service/vacantes.js'
import {urlImagen} from '../service/api.js'
import {formatearSalario, formatearFecha, dominio} from '../utils/formato.js'
import {MODALIDADES, TIPOS, CATEGORIAS} from '../utils/opciones.js'
import SeccionPostulacion from '../components/SeccionPostulacion.jsx'
import Cargando from '../components/Cargando.jsx'

function VacanteDetalle() {
    const {id} = useParams();
    const {esAdmin} = useAuth();
    const {data: vacante, cargando, error} = useFetch(() => obtenerVacante(id), [id]);

    if (cargando) {
        return <section><div className="container"><Cargando/></div></section>
    }

    if (error || !vacante) {
        return (
            <section>
                <div className="container">
                    <p className="vacantes__vacio">{error || 'Vacante no encontrada.'}</p>
                </div>
            </section>
        )
    }

    const empresa = vacante.empleador || {};

    return (
        <section>
            <div className="container">
                <div className="vacante__pagina">
                    <aside className="detalle__aside">
                        <img className="detalle__logo" src={urlImagen(empresa.logo)} alt={`Logo ${empresa.nombre}`}/>
                        <h2>{empresa.nombre}</h2>
                        {empresa.sitio_web && (
                            <div className="detalle__info-empresa">
                                <p><a href={empresa.sitio_web} target="_blank" rel="noreferrer">{dominio(empresa.sitio_web)}</a></p>
                            </div>
                        )}
                    </aside>

                    <div className="detalle">
                        <div className="detalle__header">
                            <div className="detalle__info">
                                <h2>{vacante.titulo}</h2>
                                <div className="detalle__info-empresa">
                                    <Link to={`/empresas/${empresa._id}`}>{empresa.nombre}</Link> • <span>{empresa.ubicacion}</span>
                                </div>
                            </div>
                            <div className="detalle__fin">
                                <p className="vacante__salario">{formatearSalario(vacante.salario)}</p>
                                {esAdmin
                                    ? <Link to={`/admin/vacantes/${vacante._id}/editar`} className="btn btn--secundario">Editar vacante</Link>
                                    : <a href="#join" className="btn">Enviar currículum</a>}
                            </div>
                        </div>

                        <div className="detalle__cuerpo">
                            <div className="detalle__seccion">
                                <div className="detalle__seccion-titulo">
                                    <h3>Resumen</h3>
                                    <p className="vacante__fecha">
                                        <span>Publicado: </span>
                                        <span>{formatearFecha(vacante.fecha_publicacion)}</span>
                                    </p>
                                </div>
                                <div className="detalle__seccion-descr">
                                    <p>{vacante.descripcion}</p>
                                    <ul className="vacante__badges">
                                        <li className="badge">{CATEGORIAS[vacante.categoria]}</li>
                                        <li className="badge">{MODALIDADES[vacante.modalidad]}</li>
                                        <li className="badge">{TIPOS[vacante.tipo]}</li>
                                        {vacante.experiencia && <li className="badge">{vacante.experiencia}</li>}
                                    </ul>
                                </div>
                            </div>

                            {vacante.descripcion_completa && (
                                <div className="detalle__seccion">
                                    <div className="detalle__seccion-titulo"><h3>Descripción</h3></div>
                                    <div className="detalle__seccion-descr">
                                        <p>{vacante.descripcion_completa}</p>
                                    </div>
                                </div>
                            )}

                            {(vacante.requisitos_texto || vacante.requisitos?.length > 0) && (
                                <div className="detalle__seccion">
                                    <div className="detalle__seccion-titulo"><h3>Requisitos</h3></div>
                                    <div className="detalle__seccion-descr">
                                        {vacante.requisitos_texto && <p>{vacante.requisitos_texto}</p>}
                                        <ul className="vacante__requisitos vacante__requisitos--detalle">
                                            {vacante.requisitos.map((requisito) => (
                                                <li key={requisito} className="vacante__requisito">{requisito}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {vacante.proponemos && (
                                <div className="detalle__seccion">
                                    <div className="detalle__seccion-titulo"><h3>Te proponemos</h3></div>
                                    <div className="detalle__seccion-descr">
                                        <p>{vacante.proponemos}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <SeccionPostulacion vacante={vacante}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VacanteDetalle
