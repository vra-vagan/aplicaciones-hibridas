import User from '../models/User.js';
import Postulacion from '../models/Postulacion.js';
import {ErrorHttp} from '../utils/ErrorHttp.js';

const CAMPOS_EDITABLES = ['nombre', 'apellido', 'email', 'telefono', 'password'];

export const listar = () => User.find().sort({apellido: 1, nombre: 1});

export const obtenerPorId = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        throw new ErrorHttp(404, 'Usuario no encontrado');
    }

    return user;
};

export const actualizar = async (id, datos, esAdmin = false) => {
    if (datos.rol !== undefined && !esAdmin) {
        throw new ErrorHttp(403, 'Solo un administrador puede cambiar el rol');
    }

    const user = await User.findById(id).select('+password');

    if (!user) {
        throw new ErrorHttp(404, 'Usuario no encontrado');
    }

    const campos = esAdmin ? [...CAMPOS_EDITABLES, 'rol'] : CAMPOS_EDITABLES;
    campos.forEach((campo) => {
        if (datos[campo] !== undefined) user[campo] = datos[campo];
    });

    await user.save();
    return user;
};

export const eliminar = async (id) => {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        throw new ErrorHttp(404, 'Usuario no encontrado');
    }

    const {deletedCount} = await Postulacion.deleteMany({usuario: user._id});
    return {user, postulaciones_eliminadas: deletedCount};
};
