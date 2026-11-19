import Empleador from '../models/Empleador.js';
import Vacante from '../models/Vacante.js';
import Postulacion from '../models/Postulacion.js';
import {ErrorHttp} from '../utils/ErrorHttp.js';
import {regexInsensible} from '../utils/texto.js';

export const listar = ({ubicacion} = {}) => {
    const filtro = {};

    if (ubicacion) {
        filtro.ubicacion = regexInsensible(ubicacion.trim());
    }

    return Empleador.find(filtro).populate('cantidad_vacantes').sort({nombre: 1});
};

export const buscarPorNombre = (nombre) =>
    Empleador.find({nombre: regexInsensible(nombre.trim())}).populate('cantidad_vacantes').sort({nombre: 1});

export const obtenerPorId = async (id) => {
    const empleador = await Empleador.findById(id).populate('cantidad_vacantes');

    if (!empleador) {
        throw new ErrorHttp(404, 'Empleador no encontrado');
    }

    return empleador;
};

export const listarVacantes = async (id) => {
    await obtenerPorId(id);
    return Vacante.find({empleador: id}).sort({fecha_publicacion: -1});
};

export const crear = (datos) => Empleador.create(datos);

export const actualizar = async (id, datos) => {
    const empleador = await Empleador.findByIdAndUpdate(id, datos, {returnDocument: 'after', runValidators: true});

    if (!empleador) {
        throw new ErrorHttp(404, 'Empleador no encontrado');
    }

    return empleador;
};

export const eliminar = async (id) => {
    const empleador = await Empleador.findByIdAndDelete(id);

    if (!empleador) {
        throw new ErrorHttp(404, 'Empleador no encontrado');
    }

    const idsVacantes = await Vacante.distinct('_id', {empleador: empleador._id});
    const {deletedCount: postulaciones} = await Postulacion.deleteMany({vacante: {$in: idsVacantes}});
    const {deletedCount: vacantes} = await Vacante.deleteMany({empleador: empleador._id});

    return {empleador, vacantes_eliminadas: vacantes, postulaciones_eliminadas: postulaciones};
};
