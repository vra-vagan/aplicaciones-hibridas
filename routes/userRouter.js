import {Router} from 'express';
import {
    obtenerUsers,
    obtenerUserPorId,
    crearUser,
    actualizarUser,
    eliminarUser
} from '../controllers/userController.js';
import {validarId} from '../middlewares/validarId.js';
import {validarUserCreacion, validarUserActualizacion} from '../middlewares/userValidaciones.js';

const router = Router();

router.get('/', obtenerUsers);
router.get('/:id', validarId, obtenerUserPorId);
router.post('/', validarUserCreacion, crearUser);
router.put('/:id', validarId, validarUserActualizacion, actualizarUser);
router.delete('/:id', validarId, eliminarUser);

export default router;
