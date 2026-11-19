import * as postulacionService from '../services/postulacionService.js';

export const obtenerPostulaciones = async (req, res) => {
    const postulaciones = await postulacionService.listar(req.user, req.query);
    res.json({message: 'success', data: postulaciones});
};

export const obtenerPostulacionPorId = async (req, res) => {
    const postulacion = await postulacionService.obtenerPorId(req.params.id, req.user);
    res.json({message: 'success', data: postulacion});
};

export const crearPostulacion = async (req, res) => {
    const postulacion = await postulacionService.crear(req.user, req.body);
    res.status(201).json({message: 'success', data: postulacion});
};

export const actualizarPostulacion = async (req, res) => {
    const postulacion = await postulacionService.actualizar(req.params.id, req.user, req.body);
    res.json({message: 'success', data: postulacion});
};

export const eliminarPostulacion = async (req, res) => {
    const postulacion = await postulacionService.eliminar(req.params.id, req.user);
    res.json({message: 'success', data: postulacion});
};
