const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  async checkPassword(loginPw) {
    return await bcrypt.compare(loginPw, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8],
    },
  },
}, {
  hooks: {
    // Moved the beforeCreate hook outside of the class definition
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'user',
});

// Define the beforeCreate hook outside of the class
User.beforeCreate(async (userData) => {
  userData.password = await bcrypt.hash(userData.password, 10);
  return userData;
});

module.exports = User;
