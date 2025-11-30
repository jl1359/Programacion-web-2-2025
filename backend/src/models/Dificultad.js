import mongoose from 'mongoose';
const dificultadSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    orden: { type: Number }
}, { collection: 'dificultad' });
export default mongoose.model('Dificultad', dificultadSchema);
