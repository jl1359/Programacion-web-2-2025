import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuarios.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
//roles permitidos
const ROLES_VALIDOS = ["administrador", "profesor"];
//generamos el token con un rol 
function generarToken(usuario) {
    return jwt.sign(
        {
        id: usuario._id,
        correo: usuario.correo,
        rol: usuario.rol,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}

function mapUsuarioResponse(usuario) {
    return {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
    };
}

export const registrarUsuario = async (req, res) => {
    try {
        let { nombre, correo, password, rol } = req.body;
        if (!nombre || !correo || !password || !rol) {
        return res
            .status(400)
            .json({ message: "Todos los campos son necesarios" });
        }
        correo = correo.trim().toLowerCase();
        if (!ROLES_VALIDOS.includes(rol)) {
        return res.status(400).json({ message: "Rol invalido" });
        }
        const existente = await Usuario.findOne({ correo });
        if (existente) {
        return res
            .status(409)
            .json({ message: "Ya hay un usuario con ese correo" });
        }
        const hash = await bcrypt.hash(password, 10);
        const usuario = await Usuario.create({
        nombre,
        correo,
        password: hash,
        rol,
        });
        const token = generarToken(usuario);
        return res.status(201).json({
        message: "Usuario registrado",
        usuario: mapUsuarioResponse(usuario),
        token,
        });
    } catch (error) {
        console.error("Error en registrarUsuario:", error);
        return res.status(500).json({ message: "Error al registrar usuario" });
    }
};

export const login = async (req, res) =>{
    try {
        let { correo, password } = req.body;
        if (!correo || !password){
        return res
            .status(400)
            .json({ message: "Correo y contraseña son necesarios" });
        }
        correo = correo.trim().toLowerCase();
        const usuario = await Usuario.findOne({ correo }) ;
        if (!usuario) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        const coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        const token = generarToken(usuario);
        return res.json({
        message: "Inicio de sesion exitoso",
        usuario: mapUsuarioResponse(usuario),
        token,
        });
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ message: "Error al iniciar sesion" });
    }
};