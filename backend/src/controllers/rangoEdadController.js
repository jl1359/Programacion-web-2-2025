import RangoEdad from '../models/RangoEdad.js';

export const getRangosEdad = async (req, res) => {
    try {
        const rangos = await RangoEdad.find();
        res.json(rangos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
