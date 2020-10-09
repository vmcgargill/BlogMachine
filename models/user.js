const bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  // Defines the user table with all user information
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 25]
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Pictures are locally stored in the public/uploads/ directory instead of stored as a blob on the database.
    // An additional feature could be to store pictures in database as blob row instead of as string of the file path.
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 50]
      }
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 10000]
      }
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    hobbies: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 5000]
      }
    },
    interests: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 5000]
      }
    }
  });

  // Associates users with the many blogs they own
  User.associate = function (models) {
    User.hasMany(models.Blog);
  };

  // Makes sure hashed password can be compared to unhashed password
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Creates a hook that makes sure password is hashed before added to the database.
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
