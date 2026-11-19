import {Link} from 'react-router-dom'

function AccesoDenegado() {
    return (
        <section className="pagina-error">
            <div className="container">
                <h1>Acceso denegado | Error 403</h1>
                <p>No tenés permisos para acceder a este recurso.</p>
                <Link to="/" className="btn">Regresar al inicio</Link>
            </div>
        </section>
    )
}

export default AccesoDenegado
