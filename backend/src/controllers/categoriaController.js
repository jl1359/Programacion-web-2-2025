import Categoria from '../models/Categoria.js';

export const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find().populate('rangos.rangoEdadId').populate('rangos.dificultades');
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
