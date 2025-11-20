import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class lotes extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "codigo"
    },
    id_medicamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medicamentos',
        key: 'id'
      }
    },
    fecha_vencimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_compra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'compras',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'lotes',
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
        name: "codigo",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codigo" },
        ]
      },
      {
        name: "id_compra",
        using: "BTREE",
        fields: [
          { name: "id_compra" },
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
