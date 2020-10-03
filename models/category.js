module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Category.associate = function(models) {
        Category.hasMany(models.Blog);
    };

    return Category;
  };