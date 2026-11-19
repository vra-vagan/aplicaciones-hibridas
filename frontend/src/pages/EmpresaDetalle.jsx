import {useParams} from 'react-router-dom'
import {useFetch} from '../hooks/useFetch.js'
import {useFiltrosUrl} from '../hooks/useFiltrosUrl.js'
import {obtenerEmpleador} from '../service/empleadores.js'
import {obtenerVacantes} from '../service/vacantes.js'
import {urlImagen} from '../service/api.js'
import {dominio} from '../utils/formato.js'
import {MODALIDADES, TIPOS} from '../utils/opciones.js'
import FiltrosVacantes from '../components/FiltrosVacantes.jsx'
import Buscador from '../components/Buscador.jsx'
import ListaVacantes from '../components/ListaVacantes.jsx'
import Cargando from '../components/Cargando.jsx'
import Aviso from '../components/Aviso.jsx'

const GRUPOS = [
    {campo: 'modalidad', titulo: 'Modalidad', opciones: MODALIDADES},
    {campo: 'tipo', titulo: 'Tipo de empleo', opciones: TIPOS}
];

function VacantesDeEmpresa({empresa}) {
    const {lista, texto, cambiar, limpiar, clave} = useFiltrosUrl();
    const seleccion = {modalidad: lista('modalidad'), tipo: lista('tipo')};
    const busqueda = texto('q');

    const {data, cargando, error} = useFetch(
        () => obtenerVacantes({...seleccion, q: busqueda, empleador: empresa._id}),
        [clave, empresa._id]
    );

    return (
        <div className="empresas__layout">
            <FiltrosVacantes
                grupos={GRUPOS}
                seleccion={seleccion}
                onCambiar={cambiar}
                onRestablecer={() => limpiar(GRUPOS.map((g) => g.campo))}
            />
            <div className="tarjetas tarjetas--lista">
                <Buscador valor={busqueda} onBuscar={(valor) => cambiar('q', valor)} placeholder={`Buscar en ${empresa.nombre}...`}/>
                {cargando && <Cargando/>}
                <Aviso tipo="error">{error}</Aviso>
                {!cargando && !error && <ListaVacantes vacantes={data} mostrarEmpresa={false}/>}
            </div>
        </div>
    )
}

function EmpresaDetalle() {
    const {id} = useParams();
    const {data: empresa, cargando, error} = useFetch(() => obtenerEmpleador(id), [id]);

    return (
        <section>
            <div className="container">
                {cargando && <Cargando/>}
                {!cargando && (error || !empresa) && <p className="vacantes__vacio">{error || 'Empresa no encontrada.'}</p>}
                {!cargando && empresa && (
                    <div className="detalle">
                        <div className="detalle__header">
                            <img className="detalle__logo" src={urlImagen(empresa.logo)} alt={`Logo ${empresa.nombre}`}/>
                            <div className="detalle__info">
                                <h2>{empresa.nombre}</h2>
                                <p>
                                    {empresa.sitio_web && (
                                        <><a href={empresa.sitio_web} target="_blank" rel="noreferrer">{dominio(empresa.sitio_web)}</a> • </>
                                    )}
                                    {empresa.ubicacion}
                                </p>
                            </div>
                        </div>
                        <p className="empresa__dato">{empresa.descripcion}</p>
                        <VacantesDeEmpresa empresa={empresa}/>
                    </div>
                )}
            </div>
        </section>
    )
}

export default EmpresaDetalle
