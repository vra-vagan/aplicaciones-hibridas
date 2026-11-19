import * as empleadorService from '../services/empleadorService.js';

export const obtenerEmpleadores = async (req, res) => {
    const empleadores = await empleadorService.listar(req.query);
    res.json({message: 'success', data: empleadores});
};

export const buscarEmpleadores = async (req, res) => {
    const empleadores = await empleadorService.buscarPorNombre(req.query.nombre);
    res.json({message: 'success', data: empleadores});
};

export const obtenerEmpleadorPorId = async (req, res) => {
    const empleador = await empleadorService.obtenerPorId(req.params.id);
    res.json({message: 'success', data: empleador});
};

export const obtenerVacantesDeEmpleador = async (req, res) => {
    const vacantes = await empleadorService.listarVacantes(req.params.id);
    res.json({message: 'success', data: vacantes});
};

export const crearEmpleador = async (req, res) => {
    const empleador = await empleadorService.crear(req.body);
    res.status(201).json({message: 'success', data: empleador});
};

export const actualizarEmpleador = async (req, res) => {
    const empleador = await empleadorService.actualizar(req.params.id, req.body);
    res.json({message: 'success', data: empleador});
};

export const eliminarEmpleador = async (req, res) => {
    const resultado = await empleadorService.eliminar(req.params.id);
    res.json({message: 'success', data: resultado});
};
