import {useState} from 'react'
import Campo from '../Campo.jsx'
import Aviso from '../Aviso.jsx'
import {validarEmpresa, hayErrores, erroresDeApi} from '../../utils/validaciones.js'

function FormEmpresa({empresa, onGuardar, textoBoton}) {
    const [datos, setDatos] = useState({
        nombre: empresa?.nombre || '',
        descripcion: empresa?.descripcion || '',
        logo: empresa?.logo || '',
        ubicacion: empresa?.ubicacion || '',
        sitio_web: empresa?.sitio_web || '',
        email_contacto: empresa?.email_contacto || ''
    });
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState('');
    const [guardando, setGuardando] = useState(false);

    function handleChange(evento) {
        const {name, value} = evento.target;
        setDatos({...datos, [name]: value});
    }

    async function handleSubmit(evento) {
        evento.preventDefault();
        const nuevosErrores = validarEmpresa(datos);
        setErrores(nuevosErrores);
        setMensaje('');

        if (hayErrores(nuevosErrores)) {
            setMensaje('Revisá los campos marcados.');
            window.scrollTo({top: 0, behavior: 'smooth'});
            return;
        }

        const enviar = Object.fromEntries(Object.entries(datos).map(([campo, valor]) => [campo, valor.trim()]));
        if (!enviar.logo) delete enviar.logo;

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

            <Campo label="Nombre" name="nombre" obligatorio value={datos.nombre} onChange={handleChange} error={errores.nombre}/>
            <Campo as="textarea" label="Descripción" name="descripcion" obligatorio value={datos.descripcion} onChange={handleChange} error={errores.descripcion}/>

            <div className="campos-fila">
                <Campo label="Ubicación" name="ubicacion" obligatorio placeholder="Ej: CABA, Argentina" value={datos.ubicacion} onChange={handleChange} error={errores.ubicacion}/>
                <Campo label="Email de contacto" name="email_contacto" type="email" obligatorio value={datos.email_contacto} onChange={handleChange} error={errores.email_contacto}/>
            </div>

            <Campo label="Sitio web" name="sitio_web" type="url" placeholder="https://..." value={datos.sitio_web} onChange={handleChange} error={errores.sitio_web}/>
            <Campo label="Logo" name="logo" placeholder="https://... o /img/empresas/logo.svg" hint="URL de la imagen. Si queda vacío se usa un logo genérico"
                   value={datos.logo} onChange={handleChange} error={errores.logo}/>

            <button type="submit" className="btn" disabled={guardando}>
                {guardando ? 'Guardando...' : textoBoton}
            </button>
        </form>
    )
}

export default FormEmpresa
