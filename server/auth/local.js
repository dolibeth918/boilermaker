const router = require('express').Router();
const { User } = require('../db/models');

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  try {
    if (!user) res.status(401).send('User not found');
    else if (!user.hasMatchingPassword(req.body.password))
      res.status(401).send('Incorrect password');
    else {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  const user = await User.create(req.body);
  try {
    req.login(user, err => {
      if (err) next(err);
      else res.json(user);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
