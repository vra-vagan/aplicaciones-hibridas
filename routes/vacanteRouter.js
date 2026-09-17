import {Router} from 'express';
import {
    obtenerVacantes,
    buscarVacantes,
    obtenerVacantePorId,
    crearVacante,
    actualizarVacante,
    eliminarVacante
} from '../controllers/vacanteController.js';
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
router.post('/', validarVacanteCreacion, crearVacante);
router.put('/:id', validarId, validarVacanteActualizacion, actualizarVacante);
router.delete('/:id', validarId, eliminarVacante);

export default router;
