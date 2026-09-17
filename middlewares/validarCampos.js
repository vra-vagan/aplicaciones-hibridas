import {validationResult} from 'express-validator';

export const validarCampos = (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            message: 'Datos inválidos',
            detalles: errores.array().map((e) => ({campo: e.path, mensaje: e.msg}))
        });
    }

    next();
};

export const cuerpoNoVacio = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({message: 'El cuerpo de la petición no puede estar vacío'});
    }
    next();
};
