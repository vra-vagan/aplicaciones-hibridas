import {Link, useNavigate} from 'react-router-dom'
import {urlImagen} from '../service/api.js'

function EmpresaCard({empresa}) {
    const navigate = useNavigate();

    function abrirDetalle(evento) {
        if (evento.target.closest('a')) return;
        navigate(`/empresas/${empresa._id}`);
    }

    return (
        <article className="empresa" onClick={abrirDetalle}>
            <div className="empresa__header">
                <img className="empresa__logo" src={urlImagen(empresa.logo)} alt={`Logo ${empresa.nombre}`}/>
                <div className="empresa__header-info">
                    <h3 className="empresa__nombre">{empresa.nombre}</h3>
                    <p className="empresa__ubicacion">{empresa.ubicacion}</p>
                </div>
            </div>
            <p className="empresa__dato">{empresa.descripcion}</p>
            <Link to={`/empresas/${empresa._id}`} className="btn">Ver detalle</Link>
        </article>
    )
}

export default EmpresaCard
