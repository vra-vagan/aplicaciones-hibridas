import * as userService from '../services/userService.js';
import {generarToken} from '../services/authService.js';

const esAdmin = (req) => req.user.rol === 'admin';

export const obtenerUsers = async (req, res) => {
    const users = await userService.listar();
    res.json({message: 'success', data: users});
};

export const obtenerPerfil = async (req, res) => {
    const user = await userService.obtenerPorId(req.user._id);
    res.json({message: 'success', data: user});
};

export const actualizarPerfil = async (req, res) => {
    const user = await userService.actualizar(req.user._id, req.body, false);
    res.json({message: 'success', token: generarToken(user), data: user});
};

export const obtenerUserPorId = async (req, res) => {
    const user = await userService.obtenerPorId(req.params.id);
    res.json({message: 'success', data: user});
};

export const actualizarUser = async (req, res) => {
    const user = await userService.actualizar(req.params.id, req.body, esAdmin(req));
    res.json({message: 'success', data: user});
};

export const eliminarUser = async (req, res) => {
    const resultado = await userService.eliminar(req.params.id);
    res.json({message: 'success', data: resultado});
};
