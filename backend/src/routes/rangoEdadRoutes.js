import express from 'express';
import { getRangosEdad } from '../controllers/rangoEdadController.js';

const router = express.Router();

router.get('/', getRangosEdad);

export default router;
