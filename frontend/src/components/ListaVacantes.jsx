import VacanteCard from './VacanteCard.jsx'

function ListaVacantes({vacantes, mostrarEmpresa = true}) {
    if (!vacantes?.length) {
        return <p className="vacantes__vacio">No se encontraron vacantes con esos criterios.</p>
    }

    return vacantes.map((vacante) => (
        <VacanteCard key={vacante._id} vacante={vacante} mostrarEmpresa={mostrarEmpresa}/>
    ));
}

export default ListaVacantes
