import mongoose from 'mongoose';

const subcategoriaSchema = new mongoose.Schema({
    nombre: { type: String, required: true }
}, { _id: false });

const rangoSchema = new mongoose.Schema({
    rangoEdadId: { type: mongoose.Schema.Types.ObjectId, ref: 'RangoEdad', required: true },
    dificultades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dificultad' }]
}, { _id: false });

const categoriaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    subcategorias: [subcategoriaSchema],
    rangos: [rangoSchema]
}, { collection: 'Proyecto.categoria' }); // Explicitly mapping to existing collection name if needed, or just 'categorias'

export default mongoose.model('Categoria', categoriaSchema);
