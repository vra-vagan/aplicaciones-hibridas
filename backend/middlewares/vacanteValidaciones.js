import {body, query} from 'express-validator';
import {CATEGORIAS, MODALIDADES, TIPOS} from '../models/Vacante.js';
import {validarCampos, cuerpoNoVacio} from './validarCampos.js';

const obligatorios = ['titulo', 'descripcion', 'empleador', 'categoria', 'modalidad', 'tipo', 'salario'].map((campo) =>
    body(campo).exists().withMessage(`El campo ${campo} es obligatorio`)
);

const campos = [
    body('titulo').optional().isString().withMessage('El título debe ser texto').trim().notEmpty().withMessage('El título no puede estar vacío'),
    body('descripcion').optional().isString().withMessage('La descripción debe ser texto').trim().notEmpty().withMessage('La descripción no puede estar vacía'),
    body('descripcion_completa').optional().isString().withMessage('La descripción completa debe ser texto').trim(),
    body('requisitos').optional().isArray().withMessage('Los requisitos deben ser una lista'),
    body('requisitos.*').isString().withMessage('Cada requisito debe ser texto').trim().notEmpty().withMessage('Un requisito no puede estar vacío'),
    body('requisitos_texto').optional().isString().withMessage('El texto de requisitos debe ser texto').trim(),
    body('proponemos').optional().isString().withMessage('El campo proponemos debe ser texto').trim(),
    body('empleador').optional().isMongoId().withMessage('El empleador debe ser un id válido'),
    body('categoria').optional().isIn(CATEGORIAS).withMessage(`La categoría debe ser una de: ${CATEGORIAS.join(', ')}`),
    body('modalidad').optional().isIn(MODALIDADES).withMessage(`La modalidad debe ser una de: ${MODALIDADES.join(', ')}`),
    body('tipo').optional().isIn(TIPOS).withMessage(`El tipo debe ser uno de: ${TIPOS.join(', ')}`),
    body('experiencia').optional().isString().withMessage('La experiencia debe ser texto').trim(),
    body('salario').optional().isFloat({min: 0}).withMessage('El salario debe ser un número mayor o igual a 0').toFloat(),
    body('prioridad').optional().isBoolean().withMessage('La prioridad debe ser true o false').toBoolean(),
    body('fecha_publicacion').optional().isISO8601().withMessage('La fecha de publicación debe tener formato AAAA-MM-DD').toDate()
];

export const validarVacanteCreacion = [cuerpoNoVacio, ...obligatorios, ...campos, validarCampos];

export const validarVacanteActualizacion = [cuerpoNoVacio, ...campos, validarCampos];

const lista = (campo, permitidos, etiqueta) =>
    query(campo).optional().isString().withMessage(`${etiqueta} debe ser texto`).bail()
        .custom((valor) => valor.split(',').every((v) => permitidos.includes(v.trim())))
        .withMessage(`${etiqueta} debe ser uno o varios de: ${permitidos.join(', ')}`);

export const validarFiltrosVacantes = [
    lista('categoria', CATEGORIAS, 'La categoría'),
    lista('modalidad', MODALIDADES, 'La modalidad'),
    lista('tipo', TIPOS, 'El tipo'),
    query('salario_min').optional().isFloat({min: 0}).withMessage('salario_min debe ser un número mayor o igual a 0'),
    query('salario_max').optional().isFloat({min: 0}).withMessage('salario_max debe ser un número mayor o igual a 0'),
    query('q').optional().isString().withMessage('La búsqueda debe ser texto'),
    query('empleador').optional().isMongoId().withMessage('El empleador debe ser un id válido'),
    query('limite').optional().isInt({min: 1, max: 50}).withMessage('El límite debe ser un número entre 1 y 50'),
    validarCampos
];

export const validarBusquedaVacantes = [
    query('titulo').exists().withMessage('Debe indicar el parámetro titulo').bail().trim().notEmpty().withMessage('El título no puede estar vacío'),
    validarCampos
];
