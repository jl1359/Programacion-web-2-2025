import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middlewares/errorHandler.js';

import categoriaRoutes from './routes/categoriaRoutes.js';
import dificultadRoutes from './routes/dificultadRoutes.js';
import rangoEdadRoutes from './routes/rangoEdadRoutes.js';
import registroRoutes from './routes/registroRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import subCategoriaRoutes from './routes/subCategoriaRoutes.js';

const app = express();

app.use(helmet({
    contentSecurityPolicy: false, 
}));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        error: 'Limite de peticiones alcanzado intenta en 15 minutos'
    }
});

const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        error: 'Demasiados intentos'
    }
});

app.use('/api/inicio/login', authLimiter);
app.use('/api/inicio/register', authLimiter);
app.use('/api/', apiLimiter);

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/inicio', registroRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/dificultades', dificultadRoutes);
app.use('/api/rangos-edad', rangoEdadRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/subcategorias', subCategoriaRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

app.use(errorHandler);

export default app;