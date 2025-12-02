import Dificultad from '../models/Dificultad.js';
import mongoose from 'mongoose';
//get
export const getDificultades = async (req, res) => {
    try {
        const dificultades = await Dificultad.find().lean();
        return res.status(200).json({
        ok: true,
        message: 'Dificultades obtenidas',
        data: dificultades,
        });
    } catch (error) {
        console.error('Error al listar dificultades:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al listar dificultades',
        });
    }
};
//get
export const getDificultadById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            message: 'Id de dificultad inválido',
        });
        }
        const dificultad = await Dificultad.findById(id);
        if (!dificultad) {
        return res.status(404).json({
            ok: false,
            message: 'Dificultad no encontrada',
        });
        }
        return res.status(200).json({
        ok: true,
        message: 'Dificultad obtenida',
        data: dificultad,
        });
    } catch (error) {
        console.error('Error al obtener dificultad:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al obtener dificultad',
        });
    }
};
//create
export const createDificultad = async (req, res) => {
    try {
        const nueva = await Dificultad.create(req.body);
        return res.status(201).json({
        ok: true,
        message: 'Dificultad creada',
        data: nueva,
        });
    } catch (error) {
        console.error('Error al crear dificultad:', error);
        return res.status(400).json({
        ok: false,
        message: 'Error al crear dificultad',
        });
    }
};
//update
export const updateDificultad = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            message: 'Id de dificultad incorrecto',
        });
        }
        const actualizada = await Dificultad.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        });
        if (!actualizada) {
        return res.status(404).json({
            ok: false,
            message: 'Dificultad no encontrada',
        });
        }
        return res.json({
        ok: true,
        message: 'Dificultad actualizada',
        data: actualizada,
        });
    } catch (error) {
        console.error('Error al actualizar dificultad:', error);
        return res.status(400).json({
        ok: false,
        message: 'Error al actualizar dificultad',
        });
    }
};
//delete
export const deleteDificultad = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            message: 'Id de dificultad incorrecto',
        });
        }
        const eliminada = await Dificultad.findByIdAndDelete(id);
        if (!eliminada) {
        return res.status(404).json({
            ok: false,
            message: 'Dificultad no encontrada',
        });
        }
        return res.json({
        ok: true,
        message: 'Dificultad eliminada',
        });
    } catch (error) {
        console.error('Error al eliminar dificultad:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al eliminar dificultad',
        });
    }
};