module.exports = function (sequelize, DataTypes) {
  // Created Category table with a name string row
  var Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Associates category with the many blogs assigned to 1 category
  Category.associate = function (models) {
    Category.hasMany(models.Blog);
  };

  return Category;
};