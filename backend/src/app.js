import express from 'express';
import cors from 'cors';

import categoriaRoutes from './routes/categoriaRoutes.js';
import dificultadRoutes from './routes/dificultadRoutes.js';
import rangoEdadRoutes from './routes/rangoEdadRoutes.js';
import registroRoutes from './routes/registroRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import cuestionarioRoutes from './routes/cuestionarioRoutes.js';
import preguntaRoutes from './routes/preguntaRoutes.js';
import evaluacionRoutes from './routes/evaluacionRoutes.js';
import subCategoriaRoutes from './routes/subCategoriaRoutes.js';

const app = express();
app.use(
    cors({
        origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json());

app.use('/api/inicio', registroRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/dificultades', dificultadRoutes);
app.use('/api/rangos-edad', rangoEdadRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cuestionarios', cuestionarioRoutes);
app.use('/api', preguntaRoutes);
app.use('/api/evaluaciones', evaluacionRoutes); 
app.use('/api/subcategorias', subCategoriaRoutes);

app.get('/', (req, res) => {
    res.send('api funcionando correctamente');
});

export default app;