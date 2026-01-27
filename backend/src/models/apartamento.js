module.exports = (sequelize, DataTypes) => {
  const Apartamento = sequelize.define(
    'Apartamento',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estado: {
        type: DataTypes.ENUM('LIVRE', 'OCUPADO', 'MANUTECAO'),
        allowNull: false,
        defaultValue: 'LIVRE'
      }
    },
    {
      tableName: 'apartamentos',
      timestamps: false
    }
  )

  return Apartamento
}
