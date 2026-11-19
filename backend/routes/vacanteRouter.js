import {Router} from 'express';
import {
    obtenerVacantes,
    buscarVacantes,
    obtenerVacantePorId,
    crearVacante,
    actualizarVacante,
    eliminarVacante
} from '../controllers/vacanteController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {soloAdmin} from '../middlewares/roleMiddleware.js';
import {validarId} from '../middlewares/validarId.js';
import {
    validarVacanteCreacion,
    validarVacanteActualizacion,
    validarFiltrosVacantes,
    validarBusquedaVacantes
} from '../middlewares/vacanteValidaciones.js';

const router = Router();

router.get('/', validarFiltrosVacantes, obtenerVacantes);
router.get('/buscar', validarBusquedaVacantes, buscarVacantes);
router.get('/:id', validarId, obtenerVacantePorId);
router.post('/', authMiddleware, soloAdmin, validarVacanteCreacion, crearVacante);
router.put('/:id', authMiddleware, soloAdmin, validarId, validarVacanteActualizacion, actualizarVacante);
router.delete('/:id', authMiddleware, soloAdmin, validarId, eliminarVacante);

export default router;
