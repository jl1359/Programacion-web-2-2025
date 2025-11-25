import Categoria from '../models/Categoria.js';
//get
export const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find()
        .populate('rangos.rangoEdadId')
        .populate('rangos.dificultades');
        res.json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al listar categorías' });
    }
};
//get
export const getCategoriaById = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id)
        .populate('rangos.rangoEdadId')
        .populate('rangos.dificultades');
        if (!categoria) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener categoría' });
    }
};
//post
export const createCategoria = async (req, res) => {
    try {
        const nueva = await Categoria.create(req.body);
        res.status(201).json(nueva);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al crear categoría' });
    }
};
//put
export const updateCategoria = async (req, res) => {
    try {
        const actualizada = await Categoria.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        if (!actualizada) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json(actualizada);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al actualizar categoría' });
    }
};
//delete
export const deleteCategoria = async (req, res) => {
    try {
        const eliminada = await Categoria.findByIdAndDelete(req.params.id);
        if (!eliminada) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar categoría' });
    }
};
