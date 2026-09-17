export const rutaNoEncontrada = (req, res) => {
    res.status(404).json({message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`});
};

export const manejarErrores = (err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({message: 'El cuerpo de la petición no es un JSON válido'});
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Datos inválidos',
            detalles: Object.values(err.errors).map((e) => ({campo: e.path, mensaje: e.message}))
        });
    }

    if (err.code === 11000) {
        const campo = Object.keys(err.keyValue)[0];
        return res.status(409).json({message: `Ya existe un registro con ese ${campo}`});
    }

    if (err.name === 'CastError') {
        return res.status(400).json({message: `Valor inválido para el campo ${err.path}`});
    }

    console.error(err);
    res.status(500).json({message: 'Error interno del servidor'});
};
