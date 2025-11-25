// src/routes/rangoEdadRoutes.js
import express from 'express';
import {
    getRangosEdad,
    getRangoEdadById,
    createRangoEdad,
    updateRangoEdad,
    deleteRangoEdad
} from '../controllers/rangoEdadController.js';

const router = express.Router();

router.get('/', getRangosEdad);
router.get('/:id', getRangoEdadById);
router.post('/', createRangoEdad);
router.put('/:id', updateRangoEdad);
router.delete('/:id', deleteRangoEdad);

export default router;
