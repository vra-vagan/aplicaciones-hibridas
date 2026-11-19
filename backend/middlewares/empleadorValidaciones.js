import {body, query} from 'express-validator';
import {validarCampos, cuerpoNoVacio} from './validarCampos.js';

const obligatorios = ['nombre', 'descripcion', 'ubicacion', 'email_contacto'].map((campo) =>
    body(campo).exists().withMessage(`El campo ${campo} es obligatorio`)
);

const campos = [
    body('nombre').optional().isString().withMessage('El nombre debe ser texto').trim().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('descripcion').optional().isString().withMessage('La descripción debe ser texto').trim().notEmpty().withMessage('La descripción no puede estar vacía'),
    body('logo').optional().isString().withMessage('El logo debe ser una ruta o URL en texto').trim(),
    body('ubicacion').optional().isString().withMessage('La ubicación debe ser texto').trim().notEmpty().withMessage('La ubicación no puede estar vacía'),
    body('sitio_web').optional({values: 'falsy'}).isURL().withMessage('El sitio web debe ser una URL válida'),
    body('email_contacto').optional().isEmail().withMessage('El email de contacto no es válido')
];

export const validarEmpleadorCreacion = [cuerpoNoVacio, ...obligatorios, ...campos, validarCampos];

export const validarEmpleadorActualizacion = [cuerpoNoVacio, ...campos, validarCampos];

export const validarFiltrosEmpleadores = [
    query('ubicacion').optional().isString().trim().notEmpty().withMessage('La ubicación no puede estar vacía'),
    validarCampos
];

export const validarBusquedaEmpleadores = [
    query('nombre').exists().withMessage('Debe indicar el parámetro nombre').bail().trim().notEmpty().withMessage('El nombre no puede estar vacío'),
    validarCampos
];
