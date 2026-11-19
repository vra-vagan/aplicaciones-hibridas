import {useSearchParams, useLocation} from 'react-router-dom'
import AdminVacantes from '../components/admin/AdminVacantes.jsx'
import AdminEmpresas from '../components/admin/AdminEmpresas.jsx'
import AdminPostulaciones from '../components/admin/AdminPostulaciones.jsx'
import AdminUsuarios from '../components/admin/AdminUsuarios.jsx'

const SECCIONES = [
    {id: 'vacantes', label: 'Vacantes', componente: AdminVacantes},
    {id: 'empresas', label: 'Empresas', componente: AdminEmpresas},
    {id: 'postulaciones', label: 'Postulaciones', componente: AdminPostulaciones},
    {id: 'usuarios', label: 'Usuarios', componente: AdminUsuarios}
];

function Admin() {
    const [params, setParams] = useSearchParams();
    const location = useLocation();

    const activa = SECCIONES.find((s) => s.id === params.get('tab')) || SECCIONES[0];
    const Seccion = activa.componente;

    return (
        <section>
            <div className="container">
                <h1>Panel de administración</h1>

                <div className="tabs">
                    {SECCIONES.map((seccion) => (
                        <button
                            key={seccion.id}
                            type="button"
                            className={`tabs__item${seccion.id === activa.id ? ' tabs__item--activo' : ''}`}
                            onClick={() => setParams({tab: seccion.id})}
                        >
                            {seccion.label}
                        </button>
                    ))}
                </div>

                <Seccion avisoInicial={location.state?.mensaje}/>
            </div>
        </section>
    )
}

export default Admin
