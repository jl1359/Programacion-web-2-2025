// src/routes/dificultadRoutes.js
import express from 'express';
import {
    getDificultades,
    getDificultadById,
    createDificultad,
    updateDificultad,
    deleteDificultad
} from '../controllers/dificultadController.js';

const router = express.Router();

router.get('/', getDificultades);
router.get('/:id', getDificultadById);
router.post('/', createDificultad);
router.put('/:id', updateDificultad);
router.delete('/:id', deleteDificultad);

export default router;
