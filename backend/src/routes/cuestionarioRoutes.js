import { Router } from 'express';
import { authMiddleware, requireRole } from '../middlewares/registro.js';
import {
    crearCuestionario,
    listarMisCuestionarios,
    listarCuestionariosPublicados,
    obtenerCuestionarioConPreguntas,
    actualizarCuestionario,
    eliminarCuestionario,
} from '../controllers/cuestionarioController.js';
const router = Router();

router.get('/publicados', listarCuestionariosPublicados);
router.get('/:id', obtenerCuestionarioConPreguntas);
router.get(
    '/',
    authMiddleware,
    requireRole('profesor', 'administrador'),
    listarMisCuestionarios
);
router.post(
    '/',
    authMiddleware,
    requireRole('profesor', 'administrador'),
    crearCuestionario
);
router.put(
    '/:id',
    authMiddleware,
    requireRole('profesor', 'administrador'),
    actualizarCuestionario
);
router.delete(
    '/:id',
    authMiddleware,
    requireRole('profesor', 'administrador'),
    eliminarCuestionario
);
export default router;