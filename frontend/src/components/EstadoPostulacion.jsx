import {ESTADOS} from '../utils/opciones.js'

function EstadoPostulacion({estado}) {
    return <span className={`estado estado--${estado}`}>{ESTADOS[estado] || estado}</span>
}

export default EstadoPostulacion
