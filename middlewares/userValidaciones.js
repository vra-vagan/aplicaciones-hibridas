import {body} from 'express-validator';
import {validarCampos, cuerpoNoVacio} from './validarCampos.js';

const obligatorios = ['nombre', 'apellido', 'email'].map((campo) =>
    body(campo).exists().withMessage(`El campo ${campo} es obligatorio`)
);

const campos = [
    body('nombre').optional().isString().withMessage('El nombre debe ser texto').trim().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellido').optional().isString().withMessage('El apellido debe ser texto').trim().notEmpty().withMessage('El apellido no puede estar vacío'),
    body('email').optional().isEmail().withMessage('El email no es válido'),
    body('telefono').optional().isString().withMessage('El teléfono debe ser texto').trim()
];

export const validarUserCreacion = [cuerpoNoVacio, ...obligatorios, ...campos, validarCampos];

export const validarUserActualizacion = [cuerpoNoVacio, ...campos, validarCampos];
