import {Router} from 'express';
import {
    obtenerUsers,
    obtenerPerfil,
    actualizarPerfil,
    obtenerUserPorId,
    actualizarUser,
    eliminarUser
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {soloAdmin, propioOAdmin} from '../middlewares/roleMiddleware.js';
import {validarId} from '../middlewares/validarId.js';
import {validarUserActualizacion} from '../middlewares/userValidaciones.js';

const router = Router();

router.use(authMiddleware);

router.get('/', soloAdmin, obtenerUsers);
router.get('/me', obtenerPerfil);
router.put('/me', validarUserActualizacion, actualizarPerfil);
router.get('/:id', validarId, propioOAdmin, obtenerUserPorId);
router.put('/:id', validarId, propioOAdmin, validarUserActualizacion, actualizarUser);
router.delete('/:id', validarId, propioOAdmin, eliminarUser);

export default router;
