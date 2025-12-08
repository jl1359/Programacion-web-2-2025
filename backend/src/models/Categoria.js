import mongoose from 'mongoose';

const rangoSchema = new mongoose.Schema(
    {
        rangoEdadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RangoEdad',
        required: true,
        },
        dificultades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dificultad' }],
    },
    { _id: false }
);
const categoriaSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String },
        rangos: [rangoSchema],
    },
    { collection: 'categoria' }
);
export default mongoose.model('Categoria', categoriaSchema);