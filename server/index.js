const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// logger middleware
const morgan = require('morgan');
app.use(morgan('dev'));

// serve up static middleware
app.use(express.static(path.join(__dirname, '../public')));

// body-parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api', require('./api'));

// server should send its index.html for any requests that don't match one of our API routes.
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public'));
});

app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function() {
  console.log('Knock, knock');
  console.log('What is happening');
  console.log(`Your server, listening on port ${port}`);
});
