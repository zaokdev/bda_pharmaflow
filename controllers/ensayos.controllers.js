import { Ensayo } from "../models/mongo/Ensayo.js";

export const crearEnsayo = async (req, res) => {
  try {
    const nuevoEnsayo = await Ensayo.create(req.body);
    res.status(201).json(nuevoEnsayo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerTodosLosEnsayos = async (req, res) => {
  try {
    //fecha_inicio -1 hace que se ordene de mas nuevo a mas viejo
    const ensayos = await Ensayo.find().sort({ fecha_inicio: -1 });

    return res.status(200).json(ensayos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
