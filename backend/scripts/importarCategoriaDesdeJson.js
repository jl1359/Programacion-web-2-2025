import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Categoria from '../src/models/Categoria.js';
import SubCategoria from '../src/models/Subcategoria.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongo conectado');
        const jsonPath = path.join(
        __dirname,
        '..',
        '..',
        'database',
        'Proyecto',
        'Proyecto.categoria.json'
        );
        const raw = await fs.readFile(jsonPath, 'utf8');
        const categoriasJson = JSON.parse(raw);

        for (const cat of categoriasJson) {
        const categoriaDoc = await Categoria.findOneAndUpdate(
            { nombre: cat.nombre },
            {
            nombre: cat.nombre,
            descripcion: cat.descripcion,
            rangos: cat.rangos || [],
            },
            { new: true, upsert: true }
        );
        if (Array.isArray(cat.subcategorias)) {
            for (const sc of cat.subcategorias) {
            await SubCategoria.findOneAndUpdate(
                {
                nombre: sc.nombre,
                categoria: categoriaDoc._id,
                },
                {
                nombre: sc.nombre,
                descripcion: sc.descripcion || '',
                categoria: categoriaDoc._id,
                },
                { upsert: true }
            );
            }
        }
        }
        console.log('Importación de categorías y subcategorías');
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Error en importación:', err);
        process.exit(1);
    }
}
main();