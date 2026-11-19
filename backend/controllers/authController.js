import * as authService from '../services/authService.js';

export const registrar = async (req, res) => {
    const {user, token} = await authService.registrar(req.body);
    res.status(201).json({message: 'Usuario registrado correctamente', token, data: user});
};

export const login = async (req, res) => {
    const {user, token} = await authService.login(req.body);
    res.json({message: 'Credenciales correctas', token, data: user});
};
