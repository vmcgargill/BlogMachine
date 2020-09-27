module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define("Blog", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 50]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [0, 100000]
      }
    }
  });

  Blog.associate = function(models) {
    Blog.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Blog;
};
