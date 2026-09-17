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
router.post('/', validarEmpleadorCreacion, crearEmpleador);
router.put('/:id', validarId, validarEmpleadorActualizacion, actualizarEmpleador);
router.delete('/:id', validarId, eliminarEmpleador);

export default router;
