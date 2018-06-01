const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const { db, User } = require('./db/models');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

// logger middleware
const morgan = require('morgan');
app.use(morgan('dev'));

// serve up static middleware
app.use(express.static(path.join(__dirname, '../public')));

// body-parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SESSION MIDDLEWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    resave: false,
    saveUninitialized: false
  })
); // this gives us req.session!

// We need to initialize passport so that it will consume our req.session object, and attach the user to the request object
app.use(passport.initialize());
app.use(passport.session()); // hooks into the persistent sessions we are using

// as a more resilient option - session information will be stored in our postgres database instead, so we can re-deploy/re-start our server without worrying about interrupting any currently logged-in users.
// SYNC SESSIONS TO OUR SEQUELIZE DB
dbStore.sync();

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

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

module.exports = app;
// const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
// app.listen(port, function() {
//   console.log('Knock, knock');
//   console.log('What is happening');
//   console.log(`Your server, listening on port ${port}`);
// });
