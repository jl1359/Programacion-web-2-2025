import { Router } from 'express';
import { authMiddleware, requireRole } from '../middlewares/registro.js';
import { hacerProfesor } from '../controllers/usuarioController.js';
const router = Router();
//permisos para que el admin pueda cambiar el rol de un usuario a profesor
router.put(
    '/:id/hacer-profesor',
    authMiddleware,
    requireRole('administrador'),
    hacerProfesor
);
export default router;
