import { Router } from 'express';
import { authMiddleware, requireRole } from '../middlewares/registro.js';
import {
    crearCuestionario,
    listarCuestionarios,
    obtenerCuestionarioPorId,
    eliminarCuestionario
} from '../controllers/cuestionarioController.js';

const router = Router();

router.use(authMiddleware);
router.get('/', 
    requireRole('profesor', 'administrador', 'estudiante'),
    listarCuestionarios
);

router.get('/:id',
    requireRole('profesor', 'administrador', 'estudiante'),
    obtenerCuestionarioPorId
);

router.post('/', 
    requireRole('profesor', 'administrador'), 
    crearCuestionario
);

router.delete('/:id', 
    requireRole('profesor', 'administrador'), 
    eliminarCuestionario
);

export default router;