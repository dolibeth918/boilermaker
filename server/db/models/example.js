const Sequelize = require('sequelize');
const db = require('../index');

const Example = db.define('example', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Example;
