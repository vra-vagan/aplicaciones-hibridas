import {CATEGORIAS, MODALIDADES, TIPOS} from './opciones.js'

const EMAIL = /^\S+@\S+\.\S+$/;

const vacio = (valor) => !String(valor ?? '').trim();

const esUrl = (valor) => {
    try {
        const url = new URL(valor);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
};

export const hayErrores = (errores) => Object.keys(errores).length > 0;

export const erroresDeApi = (error) =>
    Object.fromEntries((error?.detalles || []).map((d) => [d.campo, d.mensaje]));

function validarPassword(errores, {password, confirmPassword}, obligatoria) {
    if (vacio(password)) {
        if (obligatoria) errores.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
        errores.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!vacio(password) && password !== confirmPassword) {
        errores.confirmPassword = 'Las contraseñas no coinciden';
    }
}

export function validarLogin({email, password}) {
    const errores = {};
    if (vacio(email)) errores.email = 'El email es obligatorio';
    else if (!EMAIL.test(email)) errores.email = 'El email no es válido';
    if (vacio(password)) errores.password = 'La contraseña es obligatoria';
    return errores;
}

export function validarRegistro(datos) {
    const errores = {};
    if (vacio(datos.nombre)) errores.nombre = 'El nombre es obligatorio';
    if (vacio(datos.apellido)) errores.apellido = 'El apellido es obligatorio';
    if (vacio(datos.email)) errores.email = 'El email es obligatorio';
    else if (!EMAIL.test(datos.email)) errores.email = 'El email no es válido';
    validarPassword(errores, datos, true);
    return errores;
}

export function validarPerfil(datos) {
    const errores = {};
    if (vacio(datos.nombre)) errores.nombre = 'El nombre es obligatorio';
    if (vacio(datos.apellido)) errores.apellido = 'El apellido es obligatorio';
    validarPassword(errores, datos, false);
    return errores;
}

export function validarPostulacion({mensaje, perfil}) {
    const errores = {};
    if (vacio(mensaje)) errores.mensaje = 'Contale a la empresa por qué te interesa el puesto';
    else if (mensaje.length > 1000) errores.mensaje = 'El mensaje no puede superar los 1000 caracteres';
    if (!vacio(perfil) && !esUrl(perfil)) errores.perfil = 'Ingresá una URL válida (ej: https://linkedin.com/in/tu-perfil)';
    return errores;
}

export function validarVacante(datos) {
    const errores = {};
    if (vacio(datos.titulo)) errores.titulo = 'El título es obligatorio';
    if (vacio(datos.descripcion)) errores.descripcion = 'La descripción es obligatoria';
    if (vacio(datos.empleador)) errores.empleador = 'Seleccioná una empresa';
    if (!CATEGORIAS[datos.categoria]) errores.categoria = 'Seleccioná una categoría';
    if (!MODALIDADES[datos.modalidad]) errores.modalidad = 'Seleccioná una modalidad';
    if (!TIPOS[datos.tipo]) errores.tipo = 'Seleccioná un tipo de empleo';
    if (vacio(datos.salario)) errores.salario = 'El salario es obligatorio';
    else if (Number.isNaN(Number(datos.salario)) || Number(datos.salario) < 0) errores.salario = 'El salario debe ser un número mayor o igual a 0';
    return errores;
}

export function validarEmpresa(datos) {
    const errores = {};
    if (vacio(datos.nombre)) errores.nombre = 'El nombre es obligatorio';
    if (vacio(datos.descripcion)) errores.descripcion = 'La descripción es obligatoria';
    if (vacio(datos.ubicacion)) errores.ubicacion = 'La ubicación es obligatoria';
    if (vacio(datos.email_contacto)) errores.email_contacto = 'El email de contacto es obligatorio';
    else if (!EMAIL.test(datos.email_contacto)) errores.email_contacto = 'El email de contacto no es válido';
    if (!vacio(datos.sitio_web) && !esUrl(datos.sitio_web)) errores.sitio_web = 'El sitio web debe ser una URL válida (https://...)';
    if (!vacio(datos.logo) && !esUrl(datos.logo) && !datos.logo.startsWith('/')) errores.logo = 'El logo debe ser una URL (https://...) o una ruta del servidor (/img/...)';
    return errores;
}
