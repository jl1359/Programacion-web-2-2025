import express from 'express';
import {
    getSubCategorias,
    getSubCategoriaById,
    createSubCategoria,
    updateSubCategoria,
    deleteSubCategoria,
} from '../controllers/subCategoriaController.js';
import { authMiddleware, requireRole } from '../middlewares/registro.js';

const router = express.Router();

router.get('/', getSubCategorias);
router.get('/:id', getSubCategoriaById);

router.post(
    '/',
    authMiddleware,
    requireRole('administrador', 'profesor'),
    createSubCategoria
);
router.put(
    '/:id',
    authMiddleware,
    requireRole('administrador', 'profesor'),
    updateSubCategoria
);
router.delete(
    '/:id',
    authMiddleware,
    requireRole('administrador'),
    deleteSubCategoria
);

export default router;