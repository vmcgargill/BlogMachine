module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define("Blog", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 100000]
      }
    },
    mood: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 20]
      }
    }
  });

  Blog.associate = function(models) {
    Blog.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Blog.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Blog;
};
