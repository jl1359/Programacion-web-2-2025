import mongoose from 'mongoose';

const rangoEdadSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    edadMin: { type: Number },
    edadMax: { type: Number }
}, { collection: 'Proyecto.rangoEdad' });

export default mongoose.model('RangoEdad', rangoEdadSchema);
