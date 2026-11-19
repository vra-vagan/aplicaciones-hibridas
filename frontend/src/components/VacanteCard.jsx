import {Link, useNavigate} from 'react-router-dom'
import {urlImagen} from '../service/api.js'
import {formatearSalario, haceDias} from '../utils/formato.js'
import {MODALIDADES, TIPOS} from '../utils/opciones.js'

function VacanteCard({vacante, mostrarEmpresa = true}) {
    const navigate = useNavigate();
    const empresa = vacante.empleador || {};

    function abrirDetalle(evento) {
        if (evento.target.closest('a')) return;
        navigate(`/vacantes/${vacante._id}`);
    }

    return (
        <article className={`vacante${vacante.prioridad ? ' vacante--prioridad' : ''}`} onClick={abrirDetalle}>
            {vacante.prioridad && (
                <div className="vacante__prioridad">
                    <img src="/img/assets/fire.svg" alt=""/>
                    Prioridad de la empresa
                </div>
            )}
            <div className="vacante__titulo">
                <h3>{vacante.titulo}</h3>
                <p className="vacante__fecha">{haceDias(vacante.fecha_publicacion)}</p>
            </div>
            <p className="vacante__salario">{formatearSalario(vacante.salario)}</p>
            {mostrarEmpresa ? (
                <Link to={`/empresas/${empresa._id}`} className="vacante__empresa-container">
                    {empresa.logo && <img className="vacante__logo" src={urlImagen(empresa.logo)} alt={`Logo ${empresa.nombre}`}/>}
                    <div className="vacante__info">
                        <span className="vacante__empresa">{empresa.nombre}</span>
                        <span className="vacante__ubicacion">{empresa.ubicacion}</span>
                    </div>
                </Link>
            ) : (
                <p className="vacante__ubicacion">{empresa.ubicacion}</p>
            )}
            <div className="vacante__badges">
                <span className="badge">{MODALIDADES[vacante.modalidad]}</span>
                <span className="badge">{TIPOS[vacante.tipo]}</span>
                {vacante.experiencia && <span className="badge">{vacante.experiencia}</span>}
            </div>
            <p className="vacante__descripcion">{vacante.descripcion}</p>
            <div className="vacante__footer">
                <Link className="btn" to={`/vacantes/${vacante._id}`}>Enviar currículum</Link>
            </div>
        </article>
    )
}

export default VacanteCard
