import Vacante from '../models/Vacante.js';
import Empleador from '../models/Empleador.js';
import {regexInsensible} from '../utils/texto.js';

const CAMPOS_EMPLEADOR = 'nombre logo ubicacion';

export const obtenerVacantes = async (req, res) => {
    const {categoria, modalidad, tipo, salario_min, salario_max} = req.query;
    const filtro = {};

    if (categoria) filtro.categoria = categoria;
    if (modalidad) filtro.modalidad = modalidad;
    if (tipo) filtro.tipo = tipo;

    if (salario_min !== undefined || salario_max !== undefined) {
        filtro.salario = {};
        if (salario_min !== undefined) filtro.salario.$gte = Number(salario_min);
        if (salario_max !== undefined) filtro.salario.$lte = Number(salario_max);
    }

    const vacantes = await Vacante.find(filtro).populate('empleador', CAMPOS_EMPLEADOR).sort({fecha_publicacion: -1});
    res.json({message: 'success', data: vacantes});
};

export const buscarVacantes = async (req, res) => {
    const vacantes = await Vacante.find({titulo: regexInsensible(req.query.titulo)})
        .populate('empleador', CAMPOS_EMPLEADOR)
        .sort({fecha_publicacion: -1});

    res.json({message: 'success', data: vacantes});
};

export const obtenerVacantePorId = async (req, res) => {
    const vacante = await Vacante.findById(req.params.id).populate('empleador');

    if (!vacante) {
        return res.status(404).json({message: 'Vacante no encontrada'});
    }

    res.json({message: 'success', data: vacante});
};

export const crearVacante = async (req, res) => {
    const existeEmpleador = await Empleador.exists({_id: req.body.empleador});

    if (!existeEmpleador) {
        return res.status(400).json({message: 'El empleador indicado no existe'});
    }

    const vacante = await Vacante.create(req.body);
    await vacante.populate('empleador', CAMPOS_EMPLEADOR);
    res.status(201).json({message: 'success', data: vacante});
};

export const actualizarVacante = async (req, res) => {
    if (req.body.empleador) {
        const existeEmpleador = await Empleador.exists({_id: req.body.empleador});

        if (!existeEmpleador) {
            return res.status(400).json({message: 'El empleador indicado no existe'});
        }
    }

    const vacante = await Vacante.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .populate('empleador', CAMPOS_EMPLEADOR);

    if (!vacante) {
        return res.status(404).json({message: 'Vacante no encontrada'});
    }

    res.json({message: 'success', data: vacante});
};

export const eliminarVacante = async (req, res) => {
    const vacante = await Vacante.findByIdAndDelete(req.params.id);

    if (!vacante) {
        return res.status(404).json({message: 'Vacante no encontrada'});
    }

    res.json({message: 'success', data: vacante});
};
