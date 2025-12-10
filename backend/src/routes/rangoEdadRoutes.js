import express from 'express';
import {
    getRangosEdad,
    getRangoEdadById,
    createRangoEdad,
    updateRangoEdad,
    deleteRangoEdad
} from '../controllers/rangoEdadController.js';
import { authMiddleware, requireRole } from '../middlewares/registro.js';

const router = express.Router();

router.get('/', getRangosEdad);
router.get('/:id', getRangoEdadById);
router.post(
    '/',
    authMiddleware,
    requireRole('administrador'),
    createRangoEdad
);
router.put(
    '/:id',
    authMiddleware,
    requireRole('administrador','profesor'),
    updateRangoEdad
);
router.delete(
    '/:id',
    authMiddleware,
    requireRole('administrador'),
    deleteRangoEdad
);
export default router;