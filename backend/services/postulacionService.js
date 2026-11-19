import Postulacion from '../models/Postulacion.js';
import Vacante from '../models/Vacante.js';
import {ErrorHttp} from '../utils/ErrorHttp.js';

const POBLAR = [
    {
        path: 'vacante',
        select: 'titulo empleador modalidad tipo salario',
        populate: {path: 'empleador', select: 'nombre logo ubicacion'}
    },
    {path: 'usuario', select: 'nombre apellido email telefono'}
];

const esAdmin = (user) => user.rol === 'admin';

const idUsuario = (postulacion) => postulacion.usuario?._id ?? postulacion.usuario;

const verificarAcceso = (postulacion, user) => {
    if (!esAdmin(user) && !idUsuario(postulacion).equals(user._id)) {
        throw new ErrorHttp(403, 'No tenés permiso sobre esta postulación');
    }
};

const buscar = async (id) => {
    const postulacion = await Postulacion.findById(id);

    if (!postulacion) {
        throw new ErrorHttp(404, 'Postulación no encontrada');
    }

    return postulacion;
};

export const listar = (user, {vacante, estado, usuario} = {}) => {
    const filtro = {};

    if (!esAdmin(user)) filtro.usuario = user._id;
    else if (usuario) filtro.usuario = usuario;

    if (vacante) filtro.vacante = vacante;
    if (estado) filtro.estado = estado;

    return Postulacion.find(filtro).populate(POBLAR).sort({createdAt: -1});
};

export const obtenerPorId = async (id, user) => {
    const postulacion = await buscar(id);
    verificarAcceso(postulacion, user);
    return postulacion.populate(POBLAR);
};

export const crear = async (user, {vacante, mensaje, perfil}) => {
    if (!(await Vacante.exists({_id: vacante}))) {
        throw new ErrorHttp(400, 'La vacante indicada no existe');
    }

    if (await Postulacion.exists({usuario: user._id, vacante})) {
        throw new ErrorHttp(409, 'Ya te postulaste a esta vacante');
    }

    const postulacion = await Postulacion.create({usuario: user._id, vacante, mensaje, perfil});
    return postulacion.populate(POBLAR);
};

export const actualizar = async (id, user, datos) => {
    const postulacion = await buscar(id);
    verificarAcceso(postulacion, user);

    if (datos.estado !== undefined && !esAdmin(user)) {
        throw new ErrorHttp(403, 'Solo un administrador puede cambiar el estado');
    }

    ['mensaje', 'perfil', 'estado'].forEach((campo) => {
        if (datos[campo] !== undefined) postulacion[campo] = datos[campo];
    });

    await postulacion.save();
    return postulacion.populate(POBLAR);
};

export const eliminar = async (id, user) => {
    const postulacion = await buscar(id);
    verificarAcceso(postulacion, user);
    await postulacion.deleteOne();
    return postulacion;
};
