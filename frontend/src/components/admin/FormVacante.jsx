import {useState} from 'react'
import Campo from '../Campo.jsx'
import Aviso from '../Aviso.jsx'
import {validarVacante, hayErrores, erroresDeApi} from '../../utils/validaciones.js'
import {CATEGORIAS, MODALIDADES, TIPOS} from '../../utils/opciones.js'
import {fechaInput} from '../../utils/formato.js'

function valoresIniciales(vacante) {
    return {
        titulo: vacante?.titulo || '',
        descripcion: vacante?.descripcion || '',
        descripcion_completa: vacante?.descripcion_completa || '',
        requisitos: vacante?.requisitos?.join(', ') || '',
        requisitos_texto: vacante?.requisitos_texto || '',
        proponemos: vacante?.proponemos || '',
        empleador: vacante?.empleador?._id || '',
        categoria: vacante?.categoria || '',
        modalidad: vacante?.modalidad || '',
        tipo: vacante?.tipo || '',
        experiencia: vacante?.experiencia || '',
        salario: vacante?.salario ?? '',
        prioridad: vacante?.prioridad || false,
        fecha_publicacion: fechaInput(vacante?.fecha_publicacion)
    };
}

function Opciones({opciones, vacia}) {
    return (
        <>
            <option value="">{vacia}</option>
            {Object.entries(opciones).map(([valor, etiqueta]) => (
                <option key={valor} value={valor}>{etiqueta}</option>
            ))}
        </>
    )
}

function FormVacante({vacante, empresas, onGuardar, textoBoton}) {
    const [datos, setDatos] = useState(() => valoresIniciales(vacante));
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState('');
    const [guardando, setGuardando] = useState(false);

    const opcionesEmpresas = Object.fromEntries(empresas.map((empresa) => [empresa._id, empresa.nombre]));

    function handleChange(evento) {
        const {name, value, type, checked} = evento.target;
        setDatos({...datos, [name]: type === 'checkbox' ? checked : value});
    }

    async function handleSubmit(evento) {
        evento.preventDefault();
        const nuevosErrores = validarVacante(datos);
        setErrores(nuevosErrores);
        setMensaje('');

        if (hayErrores(nuevosErrores)) {
            setMensaje('Revisá los campos marcados.');
            window.scrollTo({top: 0, behavior: 'smooth'});
            return;
        }

        const {fecha_publicacion, ...resto} = datos;
        const enviar = {
            ...resto,
            salario: Number(datos.salario),
            requisitos: datos.requisitos.split(',').map((r) => r.trim()).filter(Boolean)
        };
        if (fecha_publicacion) enviar.fecha_publicacion = fecha_publicacion;

        try {
            setGuardando(true);
            await onGuardar(enviar);
        } catch (error) {
            setErrores(erroresDeApi(error));
            setMensaje(error.message);
            setGuardando(false);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    return (
        <form className="contacto__formulario" onSubmit={handleSubmit} noValidate>
            <Aviso tipo="error">{mensaje}</Aviso>

            <Campo label="Título" name="titulo" obligatorio value={datos.titulo} onChange={handleChange} error={errores.titulo}/>

            <Campo as="select" label="Empresa" name="empleador" obligatorio value={datos.empleador} onChange={handleChange} error={errores.empleador}>
                <Opciones opciones={opcionesEmpresas} vacia="Seleccioná una empresa"/>
            </Campo>

            <div className="campos-fila">
                <Campo as="select" label="Categoría" name="categoria" obligatorio value={datos.categoria} onChange={handleChange} error={errores.categoria}>
                    <Opciones opciones={CATEGORIAS} vacia="Seleccioná"/>
                </Campo>
                <Campo as="select" label="Modalidad" name="modalidad" obligatorio value={datos.modalidad} onChange={handleChange} error={errores.modalidad}>
                    <Opciones opciones={MODALIDADES} vacia="Seleccioná"/>
                </Campo>
            </div>

            <div className="campos-fila">
                <Campo as="select" label="Tipo de empleo" name="tipo" obligatorio value={datos.tipo} onChange={handleChange} error={errores.tipo}>
                    <Opciones opciones={TIPOS} vacia="Seleccioná"/>
                </Campo>
                <Campo label="Experiencia" name="experiencia" placeholder="Ej: 2-4 años" value={datos.experiencia} onChange={handleChange} error={errores.experiencia}/>
            </div>

            <div className="campos-fila">
                <Campo label="Salario (ARS)" name="salario" type="number" min="0" obligatorio value={datos.salario} onChange={handleChange} error={errores.salario}/>
                <Campo label="Fecha de publicación" name="fecha_publicacion" type="date" hint="Si queda vacía se usa la fecha de hoy"
                       value={datos.fecha_publicacion} onChange={handleChange} error={errores.fecha_publicacion}/>
            </div>

            <Campo as="textarea" label="Resumen" name="descripcion" obligatorio value={datos.descripcion} onChange={handleChange} error={errores.descripcion}/>
            <Campo as="textarea" label="Descripción completa" name="descripcion_completa" value={datos.descripcion_completa} onChange={handleChange} error={errores.descripcion_completa}/>
            <Campo label="Requisitos" name="requisitos" placeholder="Ej: React, Node.js, Git" hint="Separados por coma"
                   value={datos.requisitos} onChange={handleChange} error={errores.requisitos}/>
            <Campo as="textarea" label="Detalle de requisitos" name="requisitos_texto" value={datos.requisitos_texto} onChange={handleChange} error={errores.requisitos_texto}/>
            <Campo as="textarea" label="Te proponemos" name="proponemos" value={datos.proponemos} onChange={handleChange} error={errores.proponemos}/>

            <label className="contacto__check">
                <input type="checkbox" name="prioridad" checked={datos.prioridad} onChange={handleChange}/>
                Marcar como prioridad de la empresa
            </label>

            <button type="submit" className="btn" disabled={guardando}>
                {guardando ? 'Guardando...' : textoBoton}
            </button>
        </form>
    )
}

export default FormVacante
