import Dificultad from '../models/Dificultad.js';
import mongoose from 'mongoose';
//get
export const getDificultades = async (req, res) => {
    try {
        const dificultades = await Dificultad.find().lean();
        return res.status(200).json({
        ok: true,
        message: 'Dificultades obtenidas correctamente',
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
            message: 'ID de dificultad inválido',
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
        message: 'Dificultad obtenida correctamente',
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

//post
export const createDificultad = async (req, res) => {
    try {
        const nueva = await Dificultad.create(req.body);
        res.status(201).json(nueva);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al crear dificultad' });
    }
    };

    // PUT /api/dificultades/:id
    export const updateDificultad = async (req, res) => {
    try {
        const actualizada = await Dificultad.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        if (!actualizada) {
        return res.status(404).json({ message: 'Dificultad no encontrada' });
        }
        res.json(actualizada);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al actualizar dificultad' });
    }
};
//delete
export const deleteDificultad = async (req, res) => {
    try {
        const eliminada = await Dificultad.findByIdAndDelete(req.params.id);
        if (!eliminada) {
        return res.status(404).json({ message: 'Dificultad no encontrada' });
        }
        res.json({ message: 'Dificultad eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar dificultad' });
    }
};
