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
