'use strict';

const db = require('../index');
const Example = require('./example');

// Require all the models
// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db
// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
// Exporting all models from here seems like a good idea!

// const Student = require('./students');
// const Campus = require('./campuses');

// Student.belongsTo(Campus);
// Campus.hasMany(Student, {
//   onDelete: 'cascade',
//   hooks: true
// });

// This is also probably a good place for you to set up your associations

module.exports = { db, Example /*, Student, Campus*/ };