import Cuestionario from '../models/Cuestionario.js';
import Pregunta from '../models/Pregunta.js';
export const crearPregunta = async (req, res) => {
    try {
        const{ cuestionarioId } = req.params;
        const{ enunciado, tipo, opciones, respuestaCorrecta, puntaje } = req.body;
        const cuestionario = await Cuestionario.findById(cuestionarioId);
        if (!cuestionario) {
        return res.status(404).json({ message: 'Cuestionario no encontrado' });
        }
        if (
        req.user.rol === 'profesor' &&
        cuestionario.creador.toString() !== req.user.id
        ) {
        return res.status(403).json({ message: 'No puedes agregar preguntas aquí' });
        }
        const nuevaPregunta = await Pregunta.create({
        cuestionario: cuestionarioId,
        enunciado,
        tipo,
        opciones,
        respuestaCorrecta,
        puntaje,
        });
        res.status(201).json(nuevaPregunta);
    } catch (error) {
        console.error('Error al crear pregunta', error);
        res.status(500).json({ message: 'Error al crear pregunta' });
    }
};
export const actualizarPregunta = async (req, res) => {
    try {
        const { id } = req.params;
        const pregunta = await Pregunta.findById(id).populate('cuestionario');
        if (!pregunta) {
        return res.status(404).json({ message: 'Pregunta no encontrada' });
        }
        const cuestionario = pregunta.cuestionario;
        if (
        req.user.rol === 'profesor' &&
        cuestionario.creador.toString() !== req.user.id
        ) {
        return res.status(403).json({ message: 'No puedes editar esta pregunta' });
        }
        const campos = ['enunciado', 'tipo', 'opciones', 'respuestaCorrecta', 'puntaje'];
        campos.forEach((campo) => {
        if (req.body[campo] !== undefined) pregunta[campo] = req.body[campo];
        });
        await pregunta.save();
        res.json(pregunta);
    } catch (error) {
        console.error('Error al actualizar pregunta', error);
        res.status(500).json({ message: 'Error al actualizar pregunta' });
    }
};
export const eliminarPregunta = async (req, res) => {
    try {
        const { id } = req.params;
        const pregunta = await Pregunta.findById(id).populate('cuestionario');
        if (!pregunta) {
        return res.status(404).json({ message: 'Pregunta no encontrada' });
        }
        const cuestionario = pregunta.cuestionario;
        if (
        req.user.rol === 'profesor' &&
        cuestionario.creador.toString() !== req.user.id
        ) {
        return res.status(403).json({ message: 'No puedes eliminar esta pregunta' });
        }
        await pregunta.deleteOne();
        res.json({ message: 'Pregunta eliminada' });
    } catch (error) {
        console.error('Error al eliminar pregunta', error);
        res.status(500).json({ message: 'Error al eliminar pregunta' });
    }
};