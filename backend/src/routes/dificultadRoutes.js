import express from 'express';
import {
    getDificultades,
    getDificultadById,
    createDificultad,
    updateDificultad,
    deleteDificultad
} from '../controllers/dificultadController.js';
import { authMiddleware, requireRole } from '../middlewares/registro.js';

const router = express.Router();

router.get('/', getDificultades);
router.get('/:id', getDificultadById);

router.post(
    '/',
    authMiddleware,
    requireRole('administrador'),
    createDificultad
);
router.put(
    '/:id',
    authMiddleware,
    requireRole('administrador','profesor'),
    updateDificultad
);
router.delete(
    '/:id',
    authMiddleware,
    requireRole('administrador'),
    deleteDificultad
);

export default router;
