import { models } from "../db/mysql.js";

export const getStock = async (req, res) => {
  try {
    const stock_available = await models.medicamentos.count();
    const inventario = await models.medicamentos.findAll({
      include: [
        {
          model: models.lotes,
          as: "lotes",
        },
      ],
    });

    const response = {
      cantidad_total: stock_available,
      inventario,
    };
    res.json(response);
  } catch (e) {
    res.status(500).json({ mensaje: e.message });
  }
};

export const addMedicine = async (req, res) => {
  try {
    const { nombre, descripcion, precio_venta } = req.body;

    if (!nombre || !descripcion || !precio_venta) {
      return res.status(400).json({ mensaje: "Faltan datos" });
    }

    const medicine = models.medicamentos.create({
      nombre,
      descripcion,
      precio_venta,
    });

    if (medicine) {
      return res
        .status(201)
        .json({ mensaje: `Se ha agregado el medicamento "${nombre}"` });
    } else {
      throw new Error("Hubo un error");
    }
  } catch (e) {
    res.status(500).json({ mensaje: e.message });
  }
};
