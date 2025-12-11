import mongoose from 'mongoose';

const cuestionarioSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },
        categoria: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categoria',
            required: true
        },
        subcategoria: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategoria',
            required: true
        },
        dificultad: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dificultad',
            required: true
        },
        rangoEdad: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RangoEdad',
            required: true
        },
        creador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        },
        estado: {
            type: String,
            enum: ['BORRADOR', 'PUBLICADO'],
            default: 'BORRADOR'
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Cuestionario', cuestionarioSchema);