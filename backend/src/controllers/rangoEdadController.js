import RangoEdad from '../models/RangoEdad.js';
import mongoose from 'mongoose';
//get
export const getRangosEdad = async (req, res) => {
    try {
        const rangos = await RangoEdad.find().lean();
        return res.status(200).json({
        ok: true,
        message: 'Rangos de edad obtenidos correctamente',
        data: rangos,
        });
    } catch (error) {
        console.error('Error al listar rangos de edad:', error);
        return res.status(500).json({
        ok: false,
        message: 'error al listar rangos de edad',
        });
    }
};
//get
export const getRangoEdadById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            message: 'id de rango de edad inválido',
        });
        }

        const rango = await RangoEdad.findById(id);

        if (!rango) {
        return res.status(404).json({
            ok: false,
            message: 'rango de edad no encontrado',
        });
        }

        return res.status(200).json({
        ok: true,
        message: 'Rango de edad obtenido correctamente',
        data: rango,
        });
    } catch (error) {
        console.error('Error al obtener rango de edad:', error);
        return res.status(500).json({
        ok: false,
        message: 'error al obtener rango de edad',
        });
    }
};
//post
export const createRangoEdad = async (req, res) => {
    try {
        const nuevo = await RangoEdad.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al crear rango de edad' });
    }
};
//put
export const updateRangoEdad = async (req, res) => {
    try {
        const actualizado = await RangoEdad.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        if (!actualizado) {
        return res.status(404).json({ message: 'Rango de edad no encontrado' });
        }
        res.json(actualizado);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al actualizar rango de edad' });
    }
};
// delete
export const deleteRangoEdad = async (req, res) => {
    try {
        const eliminado = await RangoEdad.findByIdAndDelete(req.params.id);
        if (!eliminado) {
        return res.status(404).json({ message: 'Rango de edad no encontrado' });
        }
        res.json({ message: 'Rango de edad eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar rango de edad' });
    }
};
