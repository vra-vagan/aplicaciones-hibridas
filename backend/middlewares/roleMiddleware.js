export const permitirRoles = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user?.rol)) {
        return res.status(403).json({message: 'Acceso denegado: no tenés permisos para este recurso'});
    }
    next();
};

export const soloAdmin = permitirRoles('admin');

export const propioOAdmin = (req, res, next) => {
    if (req.user?.rol === 'admin' || req.user?._id.equals(req.params.id)) {
        return next();
    }
    return res.status(403).json({message: 'Acceso denegado: solo podés operar sobre tu propio usuario'});
};
