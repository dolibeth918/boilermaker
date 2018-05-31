'use strict';

const chalk = require('chalk');
const { db, Example } = require('./server/db/models');
const app = require('./server');
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

Example.create({ firstName: 'dolibeth' }).then(
  db
    .sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
    .then(() => {
      console.log(chalk.blue('db synced'));
      app.listen(port, () =>
        console.log(
          chalk.yellow(
            `Your server is ready to take your order on port ${port}`
          )
        )
      );
    })
);