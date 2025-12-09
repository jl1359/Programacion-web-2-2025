import Usuario from '../models/Usuarios.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt.js';

export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;
        if (!nombre || !correo || !password) {
        return res.status(400).json({ message: 'Faltan campos necesarios' });
        }
        const yaExiste = await Usuario.findOne({ correo });
        if (yaExiste) {
        return res.status(400).json({ message: 'El correo ya fue registrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = new Usuario({
        nombre,
        correo,
        password: hashedPassword,
        rol: 'estudiante',
        });
        await nuevoUsuario.save();
        const token = jwt.sign(
        { id: nuevoUsuario._id, correo: nuevoUsuario.correo, rol: nuevoUsuario.rol },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
        );
        res.status(201).json({
        message: 'Usuario registrado',
        usuario: {
            id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            correo: nuevoUsuario.correo,
            rol: nuevoUsuario.rol,
        },
        token,
        });
    } catch (error) {
        console.error('Error en registrarUsuario', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
export const login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        if (!correo || !password) {
        return res.status(400).json({ message: 'Faltan credenciales' });
        }
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
        return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
        return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        const token = jwt.sign(
        { id: usuario._id, correo: usuario.correo, rol: usuario.rol },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
        );
        res.json({
        message: 'Login exitoso',
        usuario: {
            id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol,
        },
        token,
        });
    } catch (error) {
        console.error('Error en login', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};