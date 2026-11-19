import {Link, useNavigate, useParams} from 'react-router-dom'
import {useFetch} from '../hooks/useFetch.js'
import {obtenerEmpleador, crearEmpleador, actualizarEmpleador} from '../service/empleadores.js'
import FormEmpresa from '../components/admin/FormEmpresa.jsx'
import Cargando from '../components/Cargando.jsx'
import Aviso from '../components/Aviso.jsx'

function EmpresaEditor() {
    const {id} = useParams();
    const esEdicion = Boolean(id);
    const navigate = useNavigate();

    const {data, cargando, error} = useFetch(
        () => (esEdicion ? obtenerEmpleador(id) : Promise.resolve({data: null})),
        [id]
    );

    async function guardar(datos) {
        if (esEdicion) await actualizarEmpleador(id, datos);
        else await crearEmpleador(datos);

        navigate('/admin?tab=empresas', {
            state: {mensaje: esEdicion ? 'La empresa se actualizó correctamente.' : 'La empresa se creó correctamente.'}
        });
    }

    return (
        <section>
            <div className="container editor">
                <Link to="/admin?tab=empresas" className="editor__volver">← Volver al panel</Link>
                <h1>{esEdicion ? 'Editar empresa' : 'Nueva empresa'}</h1>
                {cargando && <Cargando/>}
                <Aviso tipo="error">{error}</Aviso>
                {!cargando && !error && (
                    <FormEmpresa
                        empresa={data}
                        onGuardar={guardar}
                        textoBoton={esEdicion ? 'Guardar cambios' : 'Crear empresa'}
                    />
                )}
            </div>
        </section>
    )
}

export default EmpresaEditor
