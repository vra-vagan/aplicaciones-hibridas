import {useFetch} from '../hooks/useFetch.js'
import {useFiltrosUrl} from '../hooks/useFiltrosUrl.js'
import {obtenerVacantes} from '../service/vacantes.js'
import {CATEGORIAS, MODALIDADES, TIPOS} from '../utils/opciones.js'
import FiltrosVacantes from '../components/FiltrosVacantes.jsx'
import Buscador from '../components/Buscador.jsx'
import ListaVacantes from '../components/ListaVacantes.jsx'
import Cargando from '../components/Cargando.jsx'
import Aviso from '../components/Aviso.jsx'

const GRUPOS = [
    {campo: 'categoria', titulo: 'Categoría', opciones: CATEGORIAS},
    {campo: 'modalidad', titulo: 'Modalidad', opciones: MODALIDADES},
    {campo: 'tipo', titulo: 'Tipo de empleo', opciones: TIPOS}
];

function Vacantes() {
    const {lista, texto, cambiar, limpiar, clave} = useFiltrosUrl();

    const seleccion = {categoria: lista('categoria'), modalidad: lista('modalidad'), tipo: lista('tipo')};
    const busqueda = texto('q');

    const {data, cargando, error} = useFetch(
        () => obtenerVacantes({...seleccion, q: busqueda}),
        [clave]
    );

    return (
        <section>
            <div className="container">
                <h1>Catálogo de vacantes</h1>
                <div className="vacantes__layout">
                    <FiltrosVacantes
                        grupos={GRUPOS}
                        seleccion={seleccion}
                        onCambiar={cambiar}
                        onRestablecer={() => limpiar(GRUPOS.map((g) => g.campo))}
                    />
                    <div className="vacantes__lista">
                        <Buscador valor={busqueda} onBuscar={(valor) => cambiar('q', valor)} placeholder="Cargo o empresa..."/>
                        <div className="tarjetas tarjetas--lista">
                            {cargando && <Cargando/>}
                            <Aviso tipo="error">{error}</Aviso>
                            {!cargando && !error && (
                                <>
                                    <p className="vacantes__total">
                                        {data.length} {data.length === 1 ? 'vacante encontrada' : 'vacantes encontradas'}
                                    </p>
                                    <ListaVacantes vacantes={data}/>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Vacantes
