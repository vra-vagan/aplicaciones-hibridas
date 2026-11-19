import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {ErrorHttp} from '../utils/ErrorHttp.js';

export const generarToken = (user) => {
    const payload = {id: user._id, nombre: user.nombre, rol: user.rol};
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN || '2h'});
};

export const registrar = async ({nombre, apellido, email, telefono, password}) => {
    const user = await User.create({nombre, apellido, email, telefono, password});
    return {user, token: generarToken(user)};
};

export const login = async ({email, password}) => {
    const user = await User.findOne({email: email.toLowerCase().trim()}).select('+password');

    if (!user || !(await user.compararPassword(password))) {
        throw new ErrorHttp(401, 'Email o contraseña incorrectos');
    }

    return {user, token: generarToken(user)};
};

export const decodificarToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
