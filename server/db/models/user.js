const Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');
const db = require('../index');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  }
});

//hooks
User.beforeCreate(userInstance => {
  userInstance.password = setSaltAndPassword(userInstance.password);
});

User.beforeUpdate(userInstance => {
  userInstance.password = setSaltAndPassword(userInstance.password);
});

// instance methods
User.prototype.correctPassword = function(candidatePassword) {
  // should return true or false for if the entered password matches
};

// class methods
User.generateSalt = function() {
  // this should generate our random salt
};

User.encryptPassword = function(plainText, salt) {
  // accepts a plain text password and a salt, and returns its hash
};

function setSaltAndPassword(user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
}

module.exports = User;
