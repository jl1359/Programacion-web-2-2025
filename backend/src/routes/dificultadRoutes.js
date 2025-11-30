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
    requireRole('admin', 'profesor'),
    createDificultad
);

router.put(
    '/:id',
    authMiddleware,
    requireRole('admin', 'profesor'),
    updateDificultad
);

//eliminar solo para el admin
router.delete(
    '/:id',
    authMiddleware,
    requireRole('admin'),
    deleteDificultad
);

export default router;
