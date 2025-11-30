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
        message: 'Categorias obtenidas',
        data: categorias,
        });
    } catch (error) {
        console.error('Error al listar categorias:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al listar categorias',
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
            message: 'id de categoria',
        });
        }
        const categoria = await Categoria.findById(id)
        .populate('rangos.rangoEdadId')
        .populate('rangos.dificultades');
        if (!categoria) {
        return res.status(404).json({
            ok: false,
            message: 'Categoria no encontrada',
        });
        }
        return res.status(200).json({
        ok: true,
        message: 'Categoria obtenida',
        data: categoria,
        });
    } catch (error) {
        console.error('Error al obtener categoria:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al obtener categoria',
        });
    }
};
//create
export const createCategoria = async (req, res) => {
    try {
        const nueva = await Categoria.create(req.body);
        return res.status(201).json({
        ok: true,
        message: 'Categoria creada',
        data: nueva,
        });
    } catch (error) {
        console.error('Error al crear categoria:', error);
        return res.status(400).json({
        ok: false,
        message: 'Error al crear categoria',
        });
    }
};
//update
export const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            message: 'Id de categoria incorrecto',
        });
        }
        const actualizada = await Categoria.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        });
        if (!actualizada) {
        return res.status(404).json({
            ok: false,
            message: 'Categoria no encontrada',
        });
        }
        return res.json({
        ok: true,
        message: 'Categoria actualizada',
        data: actualizada,
        });
    } catch (error) {
        console.error('Error al actualizar categoria:', error);
        return res.status(400).json({
        ok: false,
        message: 'Error al actualizar categoria',
        });
    }
};
//delete
export const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            message: 'Id de categoria incorrecto',
        });
        }
        const eliminada = await Categoria.findByIdAndDelete(id);
        if (!eliminada) {
        return res.status(404).json({
            ok: false,
            message: 'Categoria no encontrada',
        });
        }
        return res.json({
        ok: true,
        message: 'Categoria eliminada',
        });
    } catch (error) {
        console.error('Error al eliminar categoria:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al eliminar categoria',
        });
    }
};;