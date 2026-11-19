import mongoose from 'mongoose';

export const validarId = (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({message: 'El id no es válido'});
    }
    next();
};
