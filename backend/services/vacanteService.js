import Vacante from '../models/Vacante.js';
import Empleador from '../models/Empleador.js';
import Postulacion from '../models/Postulacion.js';
import {ErrorHttp} from '../utils/ErrorHttp.js';
import {regexInsensible} from '../utils/texto.js';

const CAMPOS_EMPLEADOR = 'nombre logo ubicacion';

const enLista = (valor) => ({$in: valor.split(',').map((v) => v.trim())});

const verificarEmpleador = async (id) => {
    if (!(await Empleador.exists({_id: id}))) {
        throw new ErrorHttp(400, 'El empleador indicado no existe');
    }
};

export const listar = async ({categoria, modalidad, tipo, salario_min, salario_max, q, empleador, limite} = {}) => {
    const filtro = {};

    if (categoria) filtro.categoria = enLista(categoria);
    if (modalidad) filtro.modalidad = enLista(modalidad);
    if (tipo) filtro.tipo = enLista(tipo);
    if (empleador) filtro.empleador = empleador;

    if (salario_min !== undefined || salario_max !== undefined) {
        filtro.salario = {};
        if (salario_min !== undefined) filtro.salario.$gte = Number(salario_min);
        if (salario_max !== undefined) filtro.salario.$lte = Number(salario_max);
    }

    if (q && q.trim()) {
        const regex = regexInsensible(q.trim());
        const empleadores = await Empleador.distinct('_id', {nombre: regex});
        filtro.$or = [{titulo: regex}, {descripcion: regex}, {empleador: {$in: empleadores}}];
    }

    const consulta = Vacante.find(filtro).populate('empleador', CAMPOS_EMPLEADOR).sort({fecha_publicacion: -1});

    if (limite) {
        consulta.limit(Number(limite));
    }

    return consulta;
};

export const buscarPorTitulo = (titulo) =>
    Vacante.find({titulo: regexInsensible(titulo.trim())})
        .populate('empleador', CAMPOS_EMPLEADOR)
        .sort({fecha_publicacion: -1});

export const obtenerPorId = async (id) => {
    const vacante = await Vacante.findById(id).populate('empleador');

    if (!vacante) {
        throw new ErrorHttp(404, 'Vacante no encontrada');
    }

    return vacante;
};

export const crear = async (datos) => {
    await verificarEmpleador(datos.empleador);
    const vacante = await Vacante.create(datos);
    return vacante.populate('empleador', CAMPOS_EMPLEADOR);
};

export const actualizar = async (id, datos) => {
    if (datos.empleador) {
        await verificarEmpleador(datos.empleador);
    }

    const vacante = await Vacante.findByIdAndUpdate(id, datos, {returnDocument: 'after', runValidators: true})
        .populate('empleador', CAMPOS_EMPLEADOR);

    if (!vacante) {
        throw new ErrorHttp(404, 'Vacante no encontrada');
    }

    return vacante;
};

export const eliminar = async (id) => {
    const vacante = await Vacante.findByIdAndDelete(id);

    if (!vacante) {
        throw new ErrorHttp(404, 'Vacante no encontrada');
    }

    const {deletedCount} = await Postulacion.deleteMany({vacante: vacante._id});
    return {vacante, postulaciones_eliminadas: deletedCount};
};
