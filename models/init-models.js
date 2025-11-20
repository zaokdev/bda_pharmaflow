import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _compras from  "./compras.js";
import _detalle_ventas from  "./detalle_ventas.js";
import _lotes from  "./lotes.js";
import _medicamentos from  "./medicamentos.js";
import _roles from  "./roles.js";
import _usuarios from  "./usuarios.js";
import _ventas from  "./ventas.js";

export default function initModels(sequelize) {
  const compras = _compras.init(sequelize, DataTypes);
  const detalle_ventas = _detalle_ventas.init(sequelize, DataTypes);
  const lotes = _lotes.init(sequelize, DataTypes);
  const medicamentos = _medicamentos.init(sequelize, DataTypes);
  const roles = _roles.init(sequelize, DataTypes);
  const usuarios = _usuarios.init(sequelize, DataTypes);
  const ventas = _ventas.init(sequelize, DataTypes);

  lotes.belongsTo(compras, { as: "id_compra_compra", foreignKey: "id_compra"});
  compras.hasMany(lotes, { as: "lotes", foreignKey: "id_compra"});
  detalle_ventas.belongsTo(lotes, { as: "id_lote_lote", foreignKey: "id_lote"});
  lotes.hasMany(detalle_ventas, { as: "detalle_venta", foreignKey: "id_lote"});
  compras.belongsTo(medicamentos, { as: "id_medicamento_medicamento", foreignKey: "id_medicamento"});
  medicamentos.hasMany(compras, { as: "compras", foreignKey: "id_medicamento"});
  lotes.belongsTo(medicamentos, { as: "id_medicamento_medicamento", foreignKey: "id_medicamento"});
  medicamentos.hasMany(lotes, { as: "lotes", foreignKey: "id_medicamento"});
  usuarios.belongsTo(roles, { as: "id_rol_role", foreignKey: "id_rol"});
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "id_rol"});
  ventas.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(ventas, { as: "venta", foreignKey: "id_usuario"});
  detalle_ventas.belongsTo(ventas, { as: "id_venta_venta", foreignKey: "id_venta"});
  ventas.hasMany(detalle_ventas, { as: "detalle_venta", foreignKey: "id_venta"});

  return {
    compras,
    detalle_ventas,
    lotes,
    medicamentos,
    roles,
    usuarios,
    ventas,
  };
}
