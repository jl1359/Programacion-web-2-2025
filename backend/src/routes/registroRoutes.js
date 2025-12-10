import express from 'express';
import { registrarUsuario, login } from '../controllers/registroController.js';
import { authMiddleware, requireRole } from '../middlewares/registro.js';

const router = express.Router();
//registro de usuarios
router.post('/register', registrarUsuario);
//login para usuarios
router.post('/login', login);
router.get(
    '/me/admin-only',
    authMiddleware,
    requireRole('administrador'),
    (req, res) => {
        res.json({ message: 'Hola administrador', user: req.user });
    }
);

export default router;
