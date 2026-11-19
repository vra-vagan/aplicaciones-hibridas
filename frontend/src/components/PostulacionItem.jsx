import {useState} from 'react'
import {Link} from 'react-router-dom'
import {actualizarPostulacion, eliminarPostulacion} from '../service/postulaciones.js'
import {formatearFecha} from '../utils/formato.js'
import FormPostulacion from './FormPostulacion.jsx'
import EstadoPostulacion from './EstadoPostulacion.jsx'
import Aviso from './Aviso.jsx'

function PostulacionItem({postulacion, onActualizada, onEliminada}) {
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState('');

    const vacante = postulacion.vacante;
    const empresa = vacante?.empleador;

    async function guardar(datos) {
        const respuesta = await actualizarPostulacion(postulacion._id, datos);
        onActualizada(respuesta.data);
        setEditando(false);
    }

    async function retirar() {
        if (!window.confirm(`¿Retirar tu postulación a "${vacante?.titulo}"?`)) return;

        try {
            setError('');
            await eliminarPostulacion(postulacion._id);
            onEliminada(postulacion._id);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <article className="tarjeta">
            <div className="postulacion-item__cabecera">
                <div>
                    <h3>
                        {vacante ? <Link to={`/vacantes/${vacante._id}`}>{vacante.titulo}</Link> : 'Vacante eliminada'}
                    </h3>
                    <p className="postulacion-item__meta">
                        {empresa?.nombre} · {empresa?.ubicacion} · Postulado el {formatearFecha(postulacion.createdAt)}
                    </p>
                </div>
                <EstadoPostulacion estado={postulacion.estado}/>
            </div>

            {editando ? (
                <FormPostulacion
                    compacto
                    idPrefijo={postulacion._id}
                    inicial={{mensaje: postulacion.mensaje || '', perfil: postulacion.perfil || ''}}
                    textoBoton="Guardar cambios"
                    onEnviar={guardar}
                    onCancelar={() => setEditando(false)}
                />
            ) : (
                <>
                    {postulacion.mensaje && <p className="postulacion-item__mensaje">{postulacion.mensaje}</p>}
                    {postulacion.perfil && (
                        <a className="postulacion-item__perfil" href={postulacion.perfil} target="_blank" rel="noreferrer">
                            {postulacion.perfil}
                        </a>
                    )}
                    <Aviso tipo="error">{error}</Aviso>
                    <div className="acciones">
                        <button type="button" className="btn btn--secundario btn--chico" onClick={() => setEditando(true)}>Editar</button>
                        <button type="button" className="btn btn--peligro btn--chico" onClick={retirar}>Retirar postulación</button>
                    </div>
                </>
            )}
        </article>
    )
}

export default PostulacionItem
