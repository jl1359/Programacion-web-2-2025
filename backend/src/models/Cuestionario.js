import mongoose from 'mongoose';

const cuestionarioSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },

        categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        },
        subcategoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategoria',
        },
        dificultad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dificultad',
        },
        rangoEdad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RangoEdad',
        },
        creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        },
        estado: {
        type: String,
        enum: ['EN_DESARROLLO', 'PUBLICADO', 'CERRADO'],
        default: 'EN_DESARROLLO',
        },
    },
    { timestamps: true }
);
const Cuestionario = mongoose.model('Cuestionario', cuestionarioSchema);
export default Cuestionario;