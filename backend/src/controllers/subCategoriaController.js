import mongoose from 'mongoose';
import SubCategoria from '../models/Subcategoria.js';

export const getSubCategorias = async (req, res) => {
    try {
        const { categoria } = req.query;
        const filtro = categoria ? { categoria } : {};
        const subcats = await SubCategoria.find(filtro)
        .populate('categoria', 'nombre')
        .lean();
        return res.status(200).json({
        ok: true,
        message: 'Subcategorías obtenidas',
        data: subcats,
        });
    } catch (error) {
        console.error('Error al listar subcategorias:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al listar subcategorias',
        });
    }
};
export const getSubCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            message: 'Id de subcategoria incorrecto',
        });
        }
        const subcat = await SubCategoria.findById(id).populate('categoria', 'nombre');
        if (!subcat) {
        return res.status(404).json({
            ok: false,
            message: 'Subcategoria no encontrada',
        });
        }
        return res.status(200).json({
        ok: true,
        message: 'Subcategoria obtenida',
        data: subcat,
        });
    } catch (error) {
        console.error('Error al obtener subcategoria:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al obtener subcategoria',
        });
    }
    };
    export const createSubCategoria = async (req, res) => {
    try {
        const nueva = await SubCategoria.create(req.body);
        return res.status(201).json({
        ok: true,
        message: 'Subcategoria creada',
        data: nueva,
        });
    } catch (error) {
        console.error('Error al crear subcategoria:', error);
        return res.status(400).json({
        ok: false,
        message: 'Error al crear subcategoria',
        });
    }
};
export const updateSubCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            message: 'Id de subcategoria incorrecto',
        });
        }
        const actualizada = await SubCategoria.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        });
        if (!actualizada) {
        return res.status(404).json({
            ok: false,
            message: 'Subcategoria no encontrada',
        });
        }
        return res.json({
        ok: true,
        message: 'Subcategoria actualizada',
        data: actualizada,
        });
    } catch (error) {
        console.error('Error al actualizar subcategoria:', error);
        return res.status(400).json({
        ok: false,
        message: 'Error al actualizar subcategoria',
        });
    }
};
export const deleteSubCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            message: 'Id de subcategoria incorrecto',
        });
        }
        const eliminada = await SubCategoria.findByIdAndDelete(id);
        if (!eliminada) {
        return res.status(404).json({
            ok: false,
            message: 'Subcategoria no encontrada',
        });
        }
        return res.json({
        ok: true,
        message: 'Subcategoria eliminada',
        });
    } catch (error) {
        console.error('Error al eliminar subcategoria:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al eliminar subcategoria',
        });
    }
};