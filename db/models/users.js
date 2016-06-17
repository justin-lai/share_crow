const Sequelize = require('sequelize');
import sequelize from '../db.js';

const User = sequelize.define('User', {
  password: Sequelize.STRING,
  username: Sequelize.STRING,
  address: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  about: Sequelize.STRING,
});

module.exports = User;
