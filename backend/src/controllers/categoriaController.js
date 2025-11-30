import Categoria from '../models/Categoria.js';
import mongoose from 'mongoose';
//get
export const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find()
        .populate('rangos.rangoEdadId')
        .populate('rangos.dificultades')
        .lean();
        return res.status(200).json({
        ok: true,
        message: 'Categorías obtenidas correctamente',
        data: categorias,
        });
    } catch (error) {
        console.error('Error al listar categorías:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al listar categorías',
        });
    }
};
//get
export const getCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            message: 'ID de categoria invalido',
        });
        }
        const categoria = await Categoria.findById(id)
        .populate('rangos.rangoEdadId')
        .populate('rangos.dificultades');

        if (!categoria) {
        return res.status(404).json({
            ok: false,
            message: 'Categoría no encontrada',
        });
        }

        return res.status(200).json({
        ok: true,
        message: 'Categoría obtenida correctamente',
        data: categoria,
        });

    } catch (error) {
        console.error('Error al obtener categoría:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al obtener categoría',
        });
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
