import {body} from 'express-validator';
import {validarCampos, cuerpoNoVacio} from './validarCampos.js';

const obligatorios = ['nombre', 'apellido', 'email', 'password'].map((campo) =>
    body(campo).exists().withMessage(`El campo ${campo} es obligatorio`)
);

export const validarRegistro = [
    cuerpoNoVacio,
    ...obligatorios,
    body('nombre').optional().isString().withMessage('El nombre debe ser texto').trim().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellido').optional().isString().withMessage('El apellido debe ser texto').trim().notEmpty().withMessage('El apellido no puede estar vacío'),
    body('email').optional().isEmail().withMessage('El email no es válido'),
    body('password').optional().isString().withMessage('La contraseña debe ser texto').isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('telefono').optional().isString().withMessage('El teléfono debe ser texto').trim(),
    validarCampos
];

export const validarLogin = [
    cuerpoNoVacio,
    body('email').exists().withMessage('El email es obligatorio').bail().isEmail().withMessage('El email no es válido'),
    body('password').exists().withMessage('La contraseña es obligatoria').bail().isString().notEmpty().withMessage('La contraseña no puede estar vacía'),
    validarCampos
];
