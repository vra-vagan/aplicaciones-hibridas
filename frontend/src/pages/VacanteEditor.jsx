import {Link, useNavigate, useParams} from 'react-router-dom'
import {useFetch} from '../hooks/useFetch.js'
import {obtenerVacante, crearVacante, actualizarVacante} from '../service/vacantes.js'
import {obtenerEmpleadores} from '../service/empleadores.js'
import FormVacante from '../components/admin/FormVacante.jsx'
import Cargando from '../components/Cargando.jsx'
import Aviso from '../components/Aviso.jsx'

function VacanteEditor() {
    const {id} = useParams();
    const esEdicion = Boolean(id);
    const navigate = useNavigate();

    const empresas = useFetch(() => obtenerEmpleadores(), []);
    const vacante = useFetch(() => (esEdicion ? obtenerVacante(id) : Promise.resolve({data: null})), [id]);

    async function guardar(datos) {
        if (esEdicion) await actualizarVacante(id, datos);
        else await crearVacante(datos);

        navigate('/admin?tab=vacantes', {
            state: {mensaje: esEdicion ? 'La vacante se actualizó correctamente.' : 'La vacante se creó correctamente.'}
        });
    }

    const cargando = empresas.cargando || vacante.cargando;
    const error = empresas.error || vacante.error;

    return (
        <section>
            <div className="container editor">
                <Link to="/admin?tab=vacantes" className="editor__volver">← Volver al panel</Link>
                <h1>{esEdicion ? 'Editar vacante' : 'Nueva vacante'}</h1>
                {cargando && <Cargando/>}
                <Aviso tipo="error">{error}</Aviso>
                {!cargando && !error && (
                    <FormVacante
                        vacante={vacante.data}
                        empresas={empresas.data}
                        onGuardar={guardar}
                        textoBoton={esEdicion ? 'Guardar cambios' : 'Publicar vacante'}
                    />
                )}
            </div>
        </section>
    )
}

export default VacanteEditor
