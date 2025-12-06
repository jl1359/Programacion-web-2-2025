import Usuario from '../models/Usuarios.js';
export const hacerProfesor = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (usuario.rol === 'profesor') {
        return res.status(400).json({ message: 'Este usuario ya es profesor' });
        }

        usuario.rol = 'profesor';
        await usuario.save();

        res.json({
        message: 'Usuario actualizado a profesor',
        usuario: {
            id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol,
        },
        });
    } catch (error) {
        console.error('Error al hacer profesor:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
