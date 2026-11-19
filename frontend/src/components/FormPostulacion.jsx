import {useState} from 'react'
import Campo from './Campo.jsx'
import Aviso from './Aviso.jsx'
import {validarPostulacion, hayErrores, erroresDeApi} from '../utils/validaciones.js'

const VACIO = {mensaje: '', perfil: ''};

function FormPostulacion({onEnviar, onCancelar, inicial = VACIO, textoBoton = 'Enviar postulación', idPrefijo = 'postulacion', compacto = false}) {
    const [datos, setDatos] = useState(inicial);
    const [errores, setErrores] = useState({});
    const [mensajeError, setMensajeError] = useState('');
    const [enviando, setEnviando] = useState(false);

    function handleChange(evento) {
        const {name, value} = evento.target;
        setDatos({...datos, [name]: value});
    }

    async function handleSubmit(evento) {
        evento.preventDefault();
        const nuevosErrores = validarPostulacion(datos);
        setErrores(nuevosErrores);
        setMensajeError('');

        if (hayErrores(nuevosErrores)) return;

        try {
            setEnviando(true);
            await onEnviar({mensaje: datos.mensaje.trim(), perfil: datos.perfil.trim()});
        } catch (error) {
            setErrores(erroresDeApi(error));
            setMensajeError(error.message);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <form className={`contacto__formulario${compacto ? ' contacto__formulario--compacto' : ''}`} onSubmit={handleSubmit} noValidate>
            <Aviso tipo="error">{mensajeError}</Aviso>

            <Campo
                as="textarea"
                label="¿Por qué te interesa el puesto?"
                name="mensaje"
                id={`${idPrefijo}-mensaje`}
                obligatorio
                placeholder="Contá brevemente tu experiencia y motivación"
                value={datos.mensaje}
                onChange={handleChange}
                error={errores.mensaje}
                maxLength={1000}
            />

            <Campo
                label="Perfil en redes sociales"
                name="perfil"
                id={`${idPrefijo}-perfil`}
                type="url"
                placeholder="Ej: https://linkedin.com/in/tu-perfil"
                value={datos.perfil}
                onChange={handleChange}
                error={errores.perfil}
                hint="LinkedIn, GitHub, Behance o portfolio"
            />

            <div className="acciones">
                <button type="submit" className="btn" disabled={enviando}>
                    {enviando ? 'Enviando...' : textoBoton}
                </button>
                {onCancelar && (
                    <button type="button" className="btn btn--secundario" onClick={onCancelar}>Cancelar</button>
                )}
            </div>
        </form>
    )
}

export default FormPostulacion
