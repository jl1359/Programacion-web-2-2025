import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String },
    },
    { collection: 'categoria' }
);
export default mongoose.model('Categoria', categoriaSchema);