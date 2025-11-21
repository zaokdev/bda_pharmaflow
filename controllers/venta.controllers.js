import { where } from "sequelize";
import { models, sequelize } from "../db/mysql.js";

export const sellMeds = async (req, res) => {
  try {
    const venta_trans = await sequelize.transaction(async (t) => {
      let monto_total = 0;
      //Creamos la base de la venta
      const nuevaVenta = await models.ventas.create(
        {
          id_usuario: req.session.user.id,
          fecha: new Date(),
          monto_total: 0,
        },
        { transaction: t }
      );

      for (const medicamento_vendido of req.body.venta) {
        const lote = await models.lotes.findOne({
          where: {
            id: medicamento_vendido.id_lote,
          },
          transaction: t,
          lock: true,
        });

        console.log("⏳ Simulando proceso lento... Bloqueo activo.");
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Espera 5 segundos

        if (!lote) {
          throw new Error("Lote no encontrado");
        }

        if (lote.stock < medicamento_vendido.cantidad) {
          throw new Error(`Stock insuficiente de ${lote.codigo}`);
        }

        await lote.decrement("stock", {
          by: medicamento_vendido.cantidad,
          transaction: t,
        });

        const medicamento_info = await models.medicamentos.findOne({
          where: {
            id: lote.id_medicamento,
          },
          transaction: t,
        });

        await models.detalle_ventas.create(
          {
            id_venta: nuevaVenta.id,
            id_lote: medicamento_vendido.id_lote,
            cantidad_vendida: medicamento_vendido.cantidad,
            precio_venta_historico: medicamento_info.precio_venta,
          },
          { transaction: t }
        );
        monto_total =
          monto_total +
          medicamento_info.precio_venta * medicamento_vendido.cantidad;
      }

      await models.ventas.update(
        { monto_total },
        {
          where: {
            id: nuevaVenta.id,
          },
          transaction: t,
        }
      );

      nuevaVenta.monto_total = monto_total;
      return nuevaVenta;
    });

    res.status(201).json(venta_trans);
  } catch (e) {
    return res.status(500).json({ mensaje: e.message });
  }
};

export const getSalesHistory = async (req, res) => {
  try {
    const ventas = await models.ventas.findAll({
      // Ordenamos: Ventas más recientes primero
      order: [["fecha", "DESC"]],

      include: [
        // 1. QUIÉN VENDIÓ
        {
          model: models.usuarios,
          as: "id_usuario_usuario", // <--- COINCIDE CON TU initModels (Línea 29)
          attributes: ["id", "usuario", "nombre_completo"], // Solo traemos lo necesario
        },

        // 2. DETALLES DE LA VENTA
        {
          model: models.detalle_ventas,
          as: "detalle_venta", // <--- COINCIDE CON TU initModels (Línea 32)
          include: [
            // 3. QUÉ LOTE FUE
            {
              model: models.lotes,
              as: "id_lote_lote", // <--- COINCIDE CON TU initModels (Línea 22)
              attributes: ["id", "codigo", "fecha_vencimiento"],
              include: [
                // 4. QUÉ MEDICAMENTO ERA (Nombre)
                {
                  model: models.medicamentos,
                  as: "id_medicamento_medicamento", // <--- COINCIDE CON TU initModels (Línea 26)
                  attributes: ["nombre", "descripcion"],
                },
              ],
            },
          ],
        },
      ],
    });

    return res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al obtener historial", error: error.message });
  }
};
