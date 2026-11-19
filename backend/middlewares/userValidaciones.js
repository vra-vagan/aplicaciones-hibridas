import {body} from 'express-validator';
import {ROLES} from '../models/User.js';
import {validarCampos, cuerpoNoVacio} from './validarCampos.js';

const campos = [
    body('nombre').optional().isString().withMessage('El nombre debe ser texto').trim().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellido').optional().isString().withMessage('El apellido debe ser texto').trim().notEmpty().withMessage('El apellido no puede estar vacío'),
    body('email').optional().isEmail().withMessage('El email no es válido'),
    body('telefono').optional().isString().withMessage('El teléfono debe ser texto').trim(),
    body('password').optional().isString().withMessage('La contraseña debe ser texto').isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol').optional().isIn(ROLES).withMessage(`El rol debe ser uno de: ${ROLES.join(', ')}`)
];

export const validarUserActualizacion = [cuerpoNoVacio, ...campos, validarCampos];
