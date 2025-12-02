import RangoEdad from '../models/RangoEdad.js';
import mongoose from 'mongoose';
//get
export const getRangosEdad = async (req, res) => {
    try {
        const rangos = await RangoEdad.find().lean();
        return res.status(200).json({
        ok: true,
        message: 'Rangos de edad obtenidos',
        data: rangos,
        });
    } catch (error) {
        console.error('Error al listar rangos de edad:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al listar rangos de edad',
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
            message: 'Id de rango de edad incorrecto',
        });
        }

        const rango = await RangoEdad.findById(id);

        if (!rango) {
        return res.status(404).json({
            ok: false,
            message: 'Rango de edad no encontrado',
        });
        }

        return res.status(200).json({
        ok: true,
        message: 'Rango de edad obtenido',
        data: rango,
        });
    } catch (error) {
        console.error('Error al obtener rango de edad:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al obtener rango de edad',
        });
    }
};
//create
export const createRangoEdad = async (req, res) =>{
    try {
        const nuevo = await RangoEdad.create(req.body);
        return res.status(201).json({
        ok: true,
        message: 'Rango de edad creado',
        data: nuevo,
        });
    } catch (error) {
        console.error('Error al crear rango de edad:', error);
        return res.status(400).json({
        ok: false,
        message: 'Error al crear rango de edad',
        });
    }
};
//update
export const updateRangoEdad = async (req, res) =>{
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            message: 'Id de rango de edad incorrecto',
        });
        }
        const actualizado = await RangoEdad.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
        });
        if (!actualizado) {
        return res.status(404).json({
            ok: false,
            message: 'Rango de edad no encontrado',
        });
        }
        return res.json({
        ok: true,
        message: 'Rango de edad actualizado',
        data: actualizado,
        });
    } catch (error) {
        console.error('Error al actualizar rango de edad:', error);
        return res.status(400).json({
        ok: false,
        message: 'Error al actualizar rango de edad',
        });
    }
};
// delete
export const deleteRangoEdad = async (req, res) =>{
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            message: 'Id de rango de edad incoorecto',
        });
        }
        const eliminado = await RangoEdad.findByIdAndDelete(id);
        if (!eliminado) {
        return res.status(404).json({
            ok: false,
            message: 'Rango de edad no encontrado',
        });
        }
        return res.json({
        ok: true,
        message: 'Rango de edad eliminado',
        });
    } catch (error) {
        console.error('Error al eliminar rango de edad:', error);
        return res.status(500).json({
        ok: false,
        message: 'Error al eliminar rango de edad',
        });
    }
};