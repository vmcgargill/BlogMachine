module.exports = function (sequelize, DataTypes) {
  // Defines Blog table with title, body, and mood strings
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

  // Associates blogs with Users and Categories, creates CategoryId and UserId foreign key rows.
  Blog.associate = function (models) {
    // If user is deleted, all of their blogs are deleted
    Blog.belongsTo(models.User, {
      onDelete: "CASCADE"
    }, {
      foreignKey: {
        allowNull: false
      }
    });
    // Cannot deleted category that has blogs assigned to it, they are protected.
    Blog.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Blog;
};
