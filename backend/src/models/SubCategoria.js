import mongoose from 'mongoose';

const subCategoriaSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },
        categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true,
        },
    },
    {
        collection: 'subCategoria',
        timestamps: true,
    }
);
export default mongoose.model('SubCategoria', subCategoriaSchema);