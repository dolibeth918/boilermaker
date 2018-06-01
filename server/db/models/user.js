const Sequelize = require('sequelize');
const db = require('../index');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
