import express from 'express';
import categoriaRoutes from './routes/categoriaRoutes.js';
import dificultadRoutes from './routes/dificultadRoutes.js';
import rangoEdadRoutes from './routes/rangoEdadRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/categorias', categoriaRoutes);
app.use('/api/dificultades', dificultadRoutes);
app.use('/api/rangos-edad', rangoEdadRoutes);

app.get('/', (req, res) => {
    res.send('API cuestionarios funcionando');
});

export default app;
