module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define(
    'Case',
    {
      name: DataTypes.STRING,
      note: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ['created', 'approved', 'rejected'],
        defaultValue: 'created'
      }
    },
    {}
  )
  Case.associate = function (models) {
    Case.hasMany(models.Image, { foreignKey: 'case', as: 'images' })
  }
  return Case
}
