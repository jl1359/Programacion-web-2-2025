import Cuestionario from '../models/Cuestionario.js';

export const crearCuestionario = async (req, res) => {
    try {
        const { titulo, descripcion, categoria, subcategoria, dificultad, rangoEdad } = req.body;
        if (!titulo || !categoria || !subcategoria || !dificultad || !rangoEdad) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        const nuevo = await Cuestionario.create({
            titulo,
            descripcion,
            categoria,
            subcategoria,
            dificultad,
            rangoEdad,
            creador: req.user.id,
            estado: 'BORRADOR'
        });
        res.status(201).json({
            success: true,
            message: 'Cuestionario creado exitosamente',
            data: nuevo
        });
    } catch (error) {
        console.error('Error al crear cuestionario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const listarCuestionarios = async (req, res) => {
    try {
        const { categoria, dificultad } = req.query;
        let filtro = {};
        if (req.user.rol === 'profesor') {
            filtro.creador = req.user.id;
        }
        if (categoria) filtro.categoria = categoria;
        if (dificultad) filtro.dificultad = dificultad;

        const lista = await Cuestionario.find(filtro)
            .populate('categoria', 'nombre')
            .populate('subcategoria', 'nombre')
            .populate('dificultad', 'nombre')
            .populate('rangoEdad', 'nombre')
            .sort({ createdAt: -1 });

        res.json(lista);
    } catch (error) {
        console.error('Error al listar:', error);
        res.status(500).json({ message: 'Error al obtener cuestionarios' });
    }
};

export const obtenerCuestionarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const cuestionario = await Cuestionario.findById(id)
            .populate('categoria')
            .populate('subcategoria')
            .populate('dificultad')
            .populate('rangoEdad')
            .populate('creador', 'nombre correo');

        if (!cuestionario) {
            return res.status(404).json({ message: 'Cuestionario no encontrado' });
        }

        res.json(cuestionario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el cuestionario' });
    }
};

export const eliminarCuestionario = async (req, res) => {
    try {
        const { id } = req.params;
        const cuestionario = await Cuestionario.findById(id);
        if (!cuestionario) {
            return res.status(404).json({ message: 'No encontrado' });
        }
        if (req.user.rol !== 'administrador' && cuestionario.creador.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esto' });
        }
        await cuestionario.deleteOne();
        res.json({ message: 'Cuestionario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar' });
    }
};