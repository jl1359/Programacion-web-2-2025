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
    requireRole('admin', 'profesor'),
    createRangoEdad
);

router.put(
    '/:id',
    authMiddleware,
    requireRole('admin', 'profesor'),
    updateRangoEdad
);

//eliminar solo para el admin
router.delete(
    '/:id',
    authMiddleware,
    requireRole('admin'),
    deleteRangoEdad
);
export default router;