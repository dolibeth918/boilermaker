const express = require('express');
const app = express();

// logger middleware
const morgan = require('morgan');
app.use(morgan('dev'));

// serve up static middleware
app.use(express.static(path.join(__dirname, '../public')));
