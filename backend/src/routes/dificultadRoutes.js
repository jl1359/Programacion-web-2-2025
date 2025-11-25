import express from 'express';
import { getDificultades } from '../controllers/dificultadController.js';

const router = express.Router();

router.get('/', getDificultades);

export default router;
