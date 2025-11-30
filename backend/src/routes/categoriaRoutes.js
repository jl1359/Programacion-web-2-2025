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
    requireRole('admin', 'profesor'),
    createCategoria
);
router.put(
    '/:id',
    authMiddleware,
    requireRole('admin', 'profesor'),
    updateCategoria
);
//borrar solo para el administrador
router.delete(
    '/:id',
    authMiddleware,
    requireRole('admin'),
    deleteCategoria
);
export default router;