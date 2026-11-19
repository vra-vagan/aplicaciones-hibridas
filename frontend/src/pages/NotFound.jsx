import {Link} from 'react-router-dom'

function NotFound() {
    return (
        <section className="pagina-error">
            <div className="container">
                <h1>Página no encontrada | Error 404</h1>
                <p>La página que buscás no existe o fue movida.</p>
                <Link to="/" className="btn">Regresar al inicio</Link>
            </div>
        </section>
    )
}

export default NotFound
