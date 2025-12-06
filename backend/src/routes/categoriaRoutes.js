import express from 'express';
import { authMiddleware, requireRole } from '../middlewares/registro.js';
import {
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
} from '../controllers/categoriaController.js';

const router = express.Router();
router.get('/', getCategorias);
router.get('/:id', getCategoriaById);
router.post(
    '/',
    authMiddleware,
    requireRole('administrador'),
    createCategoria
);
router.put(
    '/:id',
    authMiddleware,
    requireRole('administrador','profesor'),
    updateCategoria
);
router.delete(
    '/:id',
    authMiddleware,
    requireRole('administrador'),
    deleteCategoria
);
export default router;