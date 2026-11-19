import * as vacanteService from '../services/vacanteService.js';

export const obtenerVacantes = async (req, res) => {
    const vacantes = await vacanteService.listar(req.query);
    res.json({message: 'success', data: vacantes});
};

export const buscarVacantes = async (req, res) => {
    const vacantes = await vacanteService.buscarPorTitulo(req.query.titulo);
    res.json({message: 'success', data: vacantes});
};

export const obtenerVacantePorId = async (req, res) => {
    const vacante = await vacanteService.obtenerPorId(req.params.id);
    res.json({message: 'success', data: vacante});
};

export const crearVacante = async (req, res) => {
    const vacante = await vacanteService.crear(req.body);
    res.status(201).json({message: 'success', data: vacante});
};

export const actualizarVacante = async (req, res) => {
    const vacante = await vacanteService.actualizar(req.params.id, req.body);
    res.json({message: 'success', data: vacante});
};

export const eliminarVacante = async (req, res) => {
    const resultado = await vacanteService.eliminar(req.params.id);
    res.json({message: 'success', data: resultado});
};
