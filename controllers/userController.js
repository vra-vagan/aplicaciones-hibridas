import User from '../models/User.js';

export const obtenerUsers = async (req, res) => {
    const users = await User.find().sort({apellido: 1, nombre: 1});
    res.json({message: 'success', data: users});
};

export const obtenerUserPorId = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({message: 'Usuario no encontrado'});
    }

    res.json({message: 'success', data: user});
};

export const crearUser = async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json({message: 'success', data: user});
};

export const actualizarUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if (!user) {
        return res.status(404).json({message: 'Usuario no encontrado'});
    }

    res.json({message: 'success', data: user});
};

export const eliminarUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return res.status(404).json({message: 'Usuario no encontrado'});
    }

    res.json({message: 'success', data: user});
};
