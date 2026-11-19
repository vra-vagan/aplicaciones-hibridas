import {Link, useLocation} from 'react-router-dom'
import {useAuth} from '../context/AuthContext.jsx'
import {useFetch} from '../hooks/useFetch.js'
import {obtenerPostulaciones, crearPostulacion} from '../service/postulaciones.js'
import {formatearFecha} from '../utils/formato.js'
import FormPostulacion from './FormPostulacion.jsx'
import EstadoPostulacion from './EstadoPostulacion.jsx'
import Aviso from './Aviso.jsx'
import Cargando from './Cargando.jsx'

function PostulacionCandidato({vacante, nombre}) {
    const {data, setData, cargando, error} = useFetch(
        () => obtenerPostulaciones({vacante: vacante._id}),
        [vacante._id]
    );

    if (cargando) return <Cargando/>;
    if (error) return <Aviso tipo="error">{error}</Aviso>;

    const existente = data?.[0];

    if (existente) {
        return (
            <Aviso tipo="exito">
                Ya te postulaste a esta vacante el {formatearFecha(existente.createdAt)}.
                Estado: <EstadoPostulacion estado={existente.estado}/>.
                Podés editar o retirar tu postulación desde <Link to="/perfil">Mi perfil</Link>.
            </Aviso>
        )
    }

    async function enviar(datos) {
        const respuesta = await crearPostulacion({vacante: vacante._id, ...datos});
        setData([respuesta.data]);
    }

    return (
        <>
            <p className="contacto__hint">Te postulás como <strong>{nombre}</strong>. La empresa verá tus datos de contacto.</p>
            <FormPostulacion onEnviar={enviar}/>
        </>
    )
}

function SeccionPostulacion({vacante}) {
    const {autenticado, esAdmin, user} = useAuth();
    const location = useLocation();

    let contenido;

    if (!autenticado) {
        contenido = (
            <Aviso tipo="info">
                Para postularte necesitás una cuenta.{' '}
                <Link to="/login" state={{from: location}}>Iniciá sesión</Link> o{' '}
                <Link to="/register" state={{from: location}}>creá una cuenta</Link>.
            </Aviso>
        );
    } else if (esAdmin) {
        contenido = (
            <Aviso tipo="info">
                Ingresaste como administrador, por eso no podés postularte.{' '}
                <Link to={`/admin?tab=postulaciones`}>Ver postulaciones en el panel</Link>.
            </Aviso>
        );
    } else {
        contenido = <PostulacionCandidato vacante={vacante} nombre={user.nombre}/>;
    }

    return (
        <div className="postulacion" id="join">
            <h3>Postularme a esta vacante</h3>
            {contenido}
        </div>
    )
}

export default SeccionPostulacion
