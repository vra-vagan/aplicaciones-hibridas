import Empleador from '../models/Empleador.js';
import Vacante from '../models/Vacante.js';
import {regexInsensible} from '../utils/texto.js';

export const obtenerEmpleadores = async (req, res) => {
    const {ubicacion} = req.query;
    const filtro = {};

    if (ubicacion) {
        filtro.ubicacion = regexInsensible(ubicacion);
    }

    const empleadores = await Empleador.find(filtro).sort({nombre: 1});
    res.json({message: 'success', data: empleadores});
};

export const buscarEmpleadores = async (req, res) => {
    const empleadores = await Empleador.find({nombre: regexInsensible(req.query.nombre)}).sort({nombre: 1});
    res.json({message: 'success', data: empleadores});
};

export const obtenerEmpleadorPorId = async (req, res) => {
    const empleador = await Empleador.findById(req.params.id);

    if (!empleador) {
        return res.status(404).json({message: 'Empleador no encontrado'});
    }

    res.json({message: 'success', data: empleador});
};

export const obtenerVacantesDeEmpleador = async (req, res) => {
    const empleador = await Empleador.findById(req.params.id);

    if (!empleador) {
        return res.status(404).json({message: 'Empleador no encontrado'});
    }

    const vacantes = await Vacante.find({empleador: empleador._id}).sort({fecha_publicacion: -1});
    res.json({message: 'success', data: vacantes});
};

export const crearEmpleador = async (req, res) => {
    const empleador = await Empleador.create(req.body);
    res.status(201).json({message: 'success', data: empleador});
};

export const actualizarEmpleador = async (req, res) => {
    const empleador = await Empleador.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if (!empleador) {
        return res.status(404).json({message: 'Empleador no encontrado'});
    }

    res.json({message: 'success', data: empleador});
};

export const eliminarEmpleador = async (req, res) => {
    const empleador = await Empleador.findByIdAndDelete(req.params.id);

    if (!empleador) {
        return res.status(404).json({message: 'Empleador no encontrado'});
    }

    const {deletedCount} = await Vacante.deleteMany({empleador: empleador._id});
    res.json({message: 'success', data: {empleador, vacantes_eliminadas: deletedCount}});
};
