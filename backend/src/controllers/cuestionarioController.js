import Cuestionario from '../models/Cuestionario.js';
import Pregunta from '../models/Pregunta.js';
export const crearCuestionario = async (req, res) => {
    try {
        const { titulo, descripcion, categoria, dificultad, rangoEdad } = req.body;
        const nuevo = await Cuestionario.create({
        titulo,
        descripcion,
        categoria,
        dificultad,
        rangoEdad,
        creador: req.user.id,
        });
        res.status(201).json(nuevo);
    } catch (error) {
        console.error('Error al crear cuestionario', error);
        res.status(500).json({ message: 'Error al crear cuestionario' });
    }
};
export const listarMisCuestionarios = async (req, res) => {
    try {
        const lista = await Cuestionario.find({ creador: req.user.id })
        .populate('categoria')
        .populate('dificultad')
        .populate('rangoEdad');
        res.json(lista);
    } catch (error) {
        console.error('Error al listar cuestionarios', error);
        res.status(500).json({ message: 'Error al listar cuestionarios' });
    }
};
export const listarCuestionariosPublicados = async (req, res) => {
    try {
        const lista = await Cuestionario.find({ estado: 'PUBLICADO' })
        .populate('categoria')
        .populate('dificultad')
        .populate('rangoEdad')
        .populate('creador', 'nombre correo');
        res.json(lista);
    } catch (error) {
        console.error('Error al listar cuestionarios', error);
        res.status(500).json({ message: 'Error al listar cuestionarios' });
    }
};
export const obtenerCuestionarioConPreguntas = async (req, res) => {
    try {
        const { id } = req.params;
        const cuestionario = await Cuestionario.findById(id)
        .populate('categoria')
        .populate('dificultad')
        .populate('rangoEdad')
        .populate('creador', 'nombre correo');

        if (!cuestionario) {
        return res.status(404).json({ message: 'Cuestionario no encontrado' });
        }

        const preguntas = await Pregunta.find({ cuestionario: id });

        res.json({ cuestionario, preguntas });
    } catch (error) {
        console.error('Error al obtener cuestionario', error);
        res.status(500).json({ message: 'Error al obtener cuestionario' });
    }
};
export const actualizarCuestionario = async (req, res) => {
    try {
        const { id } = req.params;
        const cuestionario = await Cuestionario.findById(id);
        if (!cuestionario) {
        return res.status(404).json({ message: 'Cuestionario no encontrado' });
        }
        if (
        req.user.rol === 'profesor' &&
        cuestionario.creador.toString() !== req.user.id
        ) {
        return res.status(403).json({ message: 'No puedes editar este cuestionario' });
        }
        const campos = ['titulo', 'descripcion', 'categoria', 'dificultad', 'rangoEdad', 'estado'];
        campos.forEach((campo) => {
        if (req.body[campo] !== undefined) cuestionario[campo] = req.body[campo];
        });

        await cuestionario.save();
        res.json(cuestionario);
    } catch (error) {
        console.error('Error al actualizar cuestionario', error);
        res.status(500).json({ message: 'Error al actualizar cuestionario' });
    }
};
export const eliminarCuestionario = async (req, res) => {
    try {
        const { id } = req.params;

        const cuestionario = await Cuestionario.findById(id);
        if (!cuestionario) {
        return res.status(404).json({ message: 'Cuestionario no encontrado' });
        }

        if (
        req.user.rol === 'profesor' &&
        cuestionario.creador.toString() !== req.user.id
        ) {
        return res.status(403).json({ message: 'No puedes eliminar este cuestionario' });
        }

        await Pregunta.deleteMany({ cuestionario: id });
        await cuestionario.deleteOne();

        res.json({ message: 'Cuestionario eliminado' });
    } catch (error) {
        console.error('Error al eliminar cuestionario', error);
        res.status(500).json({ message: 'Error al eliminar cuestionario' });
    }
};