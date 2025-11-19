import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class detalle_ventas extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ventas',
        key: 'id'
      }
    },
    id_lote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'lotes',
        key: 'id'
      }
    },
    cantidad_vendida: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_venta_historico: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'detalle_ventas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id_venta",
        using: "BTREE",
        fields: [
          { name: "id_venta" },
        ]
      },
      {
        name: "id_lote",
        using: "BTREE",
        fields: [
          { name: "id_lote" },
        ]
      },
    ]
  });
  }
}
