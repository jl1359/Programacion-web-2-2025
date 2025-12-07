import { Router } from 'express';
import { authMiddleware, requireRole } from '../middlewares/registro.js';
import {
    listarUsuarios,
    obtenerUsuarioPorId,
    obtenerPerfilActual,
    cambiarRol,
    hacerProfesor,
} from '../controllers/usuarioController.js';
const router = Router();
//perfil actual del usuario
router.get(
    '/me',
    authMiddleware,
    obtenerPerfilActual
);
//lista de usuarios
router.get(
    '/',
    authMiddleware,
    requireRole('administrador'),
    listarUsuarios
);
// Obtener usuario por id
router.get(
    '/:id',
    authMiddleware,
    requireRole('administrador'),
    obtenerUsuarioPorId
);
// cambiar rol de usuario
router.put(
    '/:id/rol',
    authMiddleware,
    requireRole('administrador'),
    cambiarRol
);
//hacer profesor
router.put(
    '/:id/hacer-profesor',
    authMiddleware,
    requireRole('administrador'),
    hacerProfesor
);
export default router;