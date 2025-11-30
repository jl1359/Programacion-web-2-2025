// backend/src/models/Usuario.js
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
        type: String,
        required: true,
        trim: true,
        },
        correo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        },
        password:{ //contraseña 
        type: String,
        required: true,
        },
        rol:{
        type: String,
        enum: ['admin', 'profesor'],
        required: true,
        },
    },
    {
        collection: 'usuarios',
        timestamps: true,
    }
);

export default mongoose.model('Usuario', usuarioSchema);
