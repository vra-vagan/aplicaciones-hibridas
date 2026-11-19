import {useFetch} from '../hooks/useFetch.js'
import {obtenerEmpleadores} from '../service/empleadores.js'
import EmpresaCard from '../components/EmpresaCard.jsx'
import Cargando from '../components/Cargando.jsx'
import Aviso from '../components/Aviso.jsx'

function Empresas() {
    const {data, cargando, error} = useFetch(() => obtenerEmpleadores(), []);

    return (
        <section>
            <div className="container">
                <h1>Empresas empleadoras</h1>
                {cargando && <Cargando/>}
                <Aviso tipo="error">{error}</Aviso>
                {data && (
                    <div className="tarjetas tarjetas--grid">
                        {data.map((empresa) => <EmpresaCard key={empresa._id} empresa={empresa}/>)}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Empresas
