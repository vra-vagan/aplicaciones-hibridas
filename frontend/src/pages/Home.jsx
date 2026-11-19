import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useFetch} from '../hooks/useFetch.js'
import {obtenerVacantes} from '../service/vacantes.js'
import {obtenerEmpleadores} from '../service/empleadores.js'
import {urlImagen} from '../service/api.js'
import ListaVacantes from '../components/ListaVacantes.jsx'
import Cargando from '../components/Cargando.jsx'
import Aviso from '../components/Aviso.jsx'

function Home() {
    const [busqueda, setBusqueda] = useState('');
    const navigate = useNavigate();

    const vacantes = useFetch(() => obtenerVacantes({limite: 5}), []);
    const empresas = useFetch(() => obtenerEmpleadores(), []);

    const ultimas = vacantes.data || [];

    function buscar(evento) {
        evento.preventDefault();
        const texto = busqueda.trim();
        navigate(texto ? `/vacantes?q=${encodeURIComponent(texto)}` : '/vacantes');
    }

    return (
        <>
            <section className="hero">
                <div className="container">
                    <div className="hero__content">
                        <h1>Encontrá el trabajo que&nbsp;va con vos</h1>
                        <p>Explorá empresas, oportunidades laborales en distintos sectores y&nbsp;encontrá tu próximo desafío profesional.</p>
                        <form className="hero__busqueda" onSubmit={buscar}>
                            <div className="hero__busqueda-inner">
                                <input
                                    className="hero__input"
                                    type="text"
                                    placeholder="Buscar por puesto, empresa o palabra clave"
                                    autoComplete="off"
                                    value={busqueda}
                                    onChange={(evento) => setBusqueda(evento.target.value)}
                                />
                                <button type="submit" className="btn">Buscar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <section className="destacadas">
                <div className="container">
                    <h2>Lo último. Descubrí las vacantes más recientes.</h2>
                    {vacantes.cargando && <Cargando/>}
                    <Aviso tipo="error">{vacantes.error}</Aviso>
                    {!vacantes.cargando && !vacantes.error && (
                        <div className="tarjetas">
                            <ListaVacantes vacantes={ultimas}/>
                        </div>
                    )}
                    <Link to="/vacantes" className="destacadas__ver-mas">Ver todo</Link>
                </div>
            </section>

            <section className="categorias">
                <div className="container">
                    <h2>Trabajá en empresas</h2>
                    {empresas.cargando && <Cargando/>}
                    <Aviso tipo="error">{empresas.error}</Aviso>
                    <div className="categorias__grilla">
                        {(empresas.data || []).slice(0, 3).map((empresa) => (
                            <Link key={empresa._id} to={`/empresas/${empresa._id}`} className="categoria__item">
                                <img className="empresa__logo" src={urlImagen(empresa.logo)} alt={`Logo ${empresa.nombre}`}/>
                                <h4 className="categoria__nombre">{empresa.nombre}</h4>
                                <p className="categoria__cantidad">
                                    {empresa.cantidad_vacantes} vacante{empresa.cantidad_vacantes !== 1 ? 's' : ''}
                                </p>
                            </Link>
                        ))}
                    </div>
                    <Link to="/empresas" className="categorias__ver-mas">Ver todo</Link>
                </div>
            </section>

        </>
    )
}

export default Home
