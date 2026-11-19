import {Router} from 'express';
import {
    obtenerPostulaciones,
    obtenerPostulacionPorId,
    crearPostulacion,
    actualizarPostulacion,
    eliminarPostulacion
} from '../controllers/postulacionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {validarId} from '../middlewares/validarId.js';
import {
    validarPostulacionCreacion,
    validarPostulacionActualizacion,
    validarFiltrosPostulaciones
} from '../middlewares/postulacionValidaciones.js';

const router = Router();

router.use(authMiddleware);

router.get('/', validarFiltrosPostulaciones, obtenerPostulaciones);
router.get('/:id', validarId, obtenerPostulacionPorId);
router.post('/', validarPostulacionCreacion, crearPostulacion);
router.put('/:id', validarId, validarPostulacionActualizacion, actualizarPostulacion);
router.delete('/:id', validarId, eliminarPostulacion);

export default router;
