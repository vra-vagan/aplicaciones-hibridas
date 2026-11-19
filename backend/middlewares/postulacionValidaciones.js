import {body, query} from 'express-validator';
import {ESTADOS} from '../models/Postulacion.js';
import {validarCampos, cuerpoNoVacio} from './validarCampos.js';

const campos = [
    body('mensaje').optional().isString().withMessage('El mensaje debe ser texto').trim().isLength({max: 1000}).withMessage('El mensaje no puede superar los 1000 caracteres'),
    body('perfil').optional({values: 'falsy'}).isURL().withMessage('El perfil debe ser una URL válida (ej: https://linkedin.com/in/usuario)')
];

export const validarPostulacionCreacion = [
    cuerpoNoVacio,
    body('vacante').exists().withMessage('El campo vacante es obligatorio').bail().isMongoId().withMessage('La vacante debe ser un id válido'),
    body('mensaje').exists().withMessage('El campo mensaje es obligatorio').bail().isString().trim().notEmpty().withMessage('El mensaje no puede estar vacío'),
    ...campos,
    validarCampos
];

export const validarPostulacionActualizacion = [
    cuerpoNoVacio,
    ...campos,
    body('estado').optional().isIn(ESTADOS).withMessage(`El estado debe ser uno de: ${ESTADOS.join(', ')}`),
    validarCampos
];

export const validarFiltrosPostulaciones = [
    query('vacante').optional().isMongoId().withMessage('La vacante debe ser un id válido'),
    query('usuario').optional().isMongoId().withMessage('El usuario debe ser un id válido'),
    query('estado').optional().isIn(ESTADOS).withMessage(`El estado debe ser uno de: ${ESTADOS.join(', ')}`),
    validarCampos
];
