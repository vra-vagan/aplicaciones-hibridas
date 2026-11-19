import {Router} from 'express';
import {registrar, login} from '../controllers/authController.js';
import {validarRegistro, validarLogin} from '../middlewares/authValidaciones.js';

const router = Router();

router.post('/register', validarRegistro, registrar);
router.post('/login', validarLogin, login);

export default router;
