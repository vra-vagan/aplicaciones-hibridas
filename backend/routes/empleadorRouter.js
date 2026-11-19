import {Router} from 'express';
import {
    obtenerEmpleadores,
    buscarEmpleadores,
    obtenerEmpleadorPorId,
    obtenerVacantesDeEmpleador,
    crearEmpleador,
    actualizarEmpleador,
    eliminarEmpleador
} from '../controllers/empleadorController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {soloAdmin} from '../middlewares/roleMiddleware.js';
import {validarId} from '../middlewares/validarId.js';
import {
    validarEmpleadorCreacion,
    validarEmpleadorActualizacion,
    validarFiltrosEmpleadores,
    validarBusquedaEmpleadores
} from '../middlewares/empleadorValidaciones.js';

const router = Router();

router.get('/', validarFiltrosEmpleadores, obtenerEmpleadores);
router.get('/buscar', validarBusquedaEmpleadores, buscarEmpleadores);
router.get('/:id', validarId, obtenerEmpleadorPorId);
router.get('/:id/vacantes', validarId, obtenerVacantesDeEmpleador);
router.post('/', authMiddleware, soloAdmin, validarEmpleadorCreacion, crearEmpleador);
router.put('/:id', authMiddleware, soloAdmin, validarId, validarEmpleadorActualizacion, actualizarEmpleador);
router.delete('/:id', authMiddleware, soloAdmin, validarId, eliminarEmpleador);

export default router;
