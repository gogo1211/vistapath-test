module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      case: DataTypes.NUMBER,
      link: DataTypes.STRING,
      annotation: DataTypes.STRING
    },
    {}
  )
  Image.associate = function (models) {
    Image.belongsTo(models.Case, { foreignKey: 'case', as: 'image' })
  }
  return Image
}
