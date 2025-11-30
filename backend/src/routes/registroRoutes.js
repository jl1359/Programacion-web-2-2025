import express from 'express';
import { registrarUsuario, login } from '../controllers/registroController.js';
import { authMiddleware, requireRole } from '../middlewares/registro.js';

const router = express.Router();
//registro de admin o profesor
router.post('/register', registrarUsuario);

//login para admin o profesor
router.post('/login', login);

router.get(
    '/me/admin-only',
    authMiddleware,
    requireRole('admin'),
    (req, res) => {
        res.json({ message: 'Hola admin', user: req.user });
    }
);

export default router;
