module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: { type: DataTypes.STRING, allowNull: true },
      updatedAt: { type: DataTypes.STRING, allowNull: true }
    });
  
    Category.associate = function(models) {
        Category.hasMany(models.Blog);
    };

    return Category;
  };