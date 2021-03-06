export default (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
  },
  {
    tableName: 'products'
  });
};
