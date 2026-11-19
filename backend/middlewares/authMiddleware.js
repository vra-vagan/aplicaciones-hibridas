import User from '../models/User.js';
import {decodificarToken} from '../services/authService.js';

const authMiddleware = async (req, res, next) => {
    const [tipo, token] = (req.headers.authorization || '').split(' ');

    if (tipo !== 'Bearer' || !token) {
        return res.status(401).json({message: 'Token requerido'});
    }

    let payload;
    try {
        payload = decodificarToken(token);
    } catch {
        return res.status(401).json({message: 'Token inválido o vencido'});
    }

    const user = await User.findById(payload.id);

    if (!user) {
        return res.status(401).json({message: 'El usuario del token ya no existe'});
    }

    req.user = user;
    next();
};

export default authMiddleware;
