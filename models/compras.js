import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class compras extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_medicamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medicamentos',
        key: 'id'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    proveedor: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'compras',
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
        name: "id_medicamento",
        using: "BTREE",
        fields: [
          { name: "id_medicamento" },
        ]
      },
    ]
  });
  }
}
