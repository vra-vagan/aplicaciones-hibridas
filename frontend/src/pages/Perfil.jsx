import {Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext.jsx'
import {useFetch} from '../hooks/useFetch.js'
import {obtenerPerfil} from '../service/usuarios.js'
import {obtenerPostulaciones} from '../service/postulaciones.js'
import FormPerfil from '../components/FormPerfil.jsx'
import PostulacionItem from '../components/PostulacionItem.jsx'
import Cargando from '../components/Cargando.jsx'
import Aviso from '../components/Aviso.jsx'

function MisPostulaciones() {
    const {data, setData, cargando, error} = useFetch(() => obtenerPostulaciones(), []);

    if (cargando) return <Cargando/>;
    if (error) return <Aviso tipo="error">{error}</Aviso>;

    if (!data.length) {
        return (
            <Aviso tipo="info">
                Todavía no te postulaste a ninguna vacante. <Link to="/vacantes">Explorá las vacantes disponibles</Link>.
            </Aviso>
        )
    }

    function reemplazar(actualizada) {
        setData(data.map((p) => (p._id === actualizada._id ? actualizada : p)));
    }

    function quitar(id) {
        setData(data.filter((p) => p._id !== id));
    }

    return (
        <div className="perfil__lista">
            {data.map((postulacion) => (
                <PostulacionItem
                    key={postulacion._id}
                    postulacion={postulacion}
                    onActualizada={reemplazar}
                    onEliminada={quitar}
                />
            ))}
        </div>
    )
}

function Perfil() {
    const {esAdmin} = useAuth();
    const {data: perfil, setData: setPerfil, cargando, error} = useFetch(() => obtenerPerfil(), []);

    return (
        <section>
            <div className="container">
                <h1>Mi perfil</h1>
                {cargando && <Cargando texto="Cargando perfil..."/>}
                <Aviso tipo="error">{error}</Aviso>
                {perfil && (
                    <div className="perfil">
                        <div>
                            <h2>Mis datos</h2>
                            <FormPerfil perfil={perfil} onActualizado={setPerfil}/>
                        </div>
                        <div>
                            <h2>Mis postulaciones</h2>
                            {esAdmin ? (
                                <Aviso tipo="info">
                                    Como administrador gestionás las postulaciones desde el <Link to="/admin?tab=postulaciones">panel</Link>.
                                </Aviso>
                            ) : (
                                <MisPostulaciones/>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Perfil
