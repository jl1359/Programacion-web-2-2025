import { Router } from 'express';
import { authMiddleware, requireRole } from '../middlewares/registro.js';
import {
    crearPregunta,
    actualizarPregunta,
    eliminarPregunta,
} from '../controllers/preguntaController.js';

const router = Router();
router.post(
    '/cuestionarios/:cuestionarioId/preguntas',
    authMiddleware,
    requireRole('profesor', 'administrador'),
    crearPregunta
);
router.put(
    '/preguntas/:id',
    authMiddleware,
    requireRole('profesor', 'administrador'),
    actualizarPregunta
);
router.delete(
    '/preguntas/:id',
    authMiddleware,
    requireRole('profesor', 'administrador'),
    eliminarPregunta
);
export default router;