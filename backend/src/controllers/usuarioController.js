import mongoose from 'mongoose';
import Usuario from '../models/Usuarios.js';
const ROLES_VALIDOS = ['administrador', 'profesor', 'estudiante'];

export const listarUsuarios = async (req, res) =>{
    try {
        const { rol } = req.query;
        const filtro = rol ? { rol } : {};
        const usuarios = await Usuario.find(filtro).select('-password');
        res.json({
        total: usuarios.length,
        usuarios,
        });
    } catch (error) {
        console.error('Error en listarUsuarios:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
export const obtenerUsuarioPorId = async (req, res) =>{
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .json({ message: 'Id de usuario incorrecto' });
        }
        const usuario = await Usuario.findById(id).select('-password');

        if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error('Error en obtenerUsuarioPorId:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
export const obtenerPerfilActual = async (req, res) =>{
    try {
        const { id } = req.user;
        const usuario = await Usuario.findById(id).select('-password');
        if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error('Error en obtenerPerfilActual:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
export const cambiarRol = async (req, res) =>{
    try {
        const { id } = req.params;
        const { rol } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .json({ message: 'Id de usuario incorrecto' });
        }
        if (!rol) {
        return res.status(400).json({ message: 'El nuevo rol es obligatorio' });
        }
        if (!ROLES_VALIDOS.includes(rol)) {
        return res.status(400).json({
            message: `Rol no válido. Roles permitidos: ${ROLES_VALIDOS.join(', ')}`,
        });
        }
        const usuario = await Usuario.findById(id);
        if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (usuario.rol === rol) {
        return res.status(400).json({ message: `El usuario ya tiene el rol ${rol}` });
        }
        usuario.rol = rol;
        await usuario.save();
        res.json({
        message: `Rol actualizado a ${rol}`,
        usuario: {
            id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol,
        },
        });
    } catch (error) {
        console.error('Error en cambiarRol:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
export const hacerProfesor = async (req, res) =>{
    req.body.rol = 'profesor';
    return cambiarRol(req, res);
};