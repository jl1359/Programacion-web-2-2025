import mongoose from 'mongoose';
const preguntaSchema = new mongoose.Schema(
    {
        cuestionario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuestionario',
        required: true,
        },
        enunciado: {
        type: String,
        required: true,
        trim: true,
        },
        tipo: {
        type: String,
        enum: ['OPCION_MULTIPLE', 'VERDADERO_FALSO', 'COMPLETAR',],
        default: 'COMPLETAR',
        },
        opciones: [
        {
            texto: { type: String, required: true },
            valor: { type: String },
        },
        ],
        respuestaCorrecta: {
        type: String,
        required: true,
        },
        puntaje: {
        type: Number,
        default: 1,
        },
    },
    { timestamps: true }
);
const Pregunta = mongoose.model('Pregunta', preguntaSchema);
export default Pregunta;