import Dificultad from '../models/Dificultad.js';

export const getDificultades = async (req, res) => {
    try {
        const dificultades = await Dificultad.find();
        res.json(dificultades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
