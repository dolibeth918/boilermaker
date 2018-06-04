const router = require('express').Router();
const { User } = require('../db/models');
console.log('in local');
router.post('/login', async (req, res, next) => {
  console.log('why not in login');
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  console.log(user.password, req.body.password);
  try {
    if (!user) res.status(401).send('User not found');
    else if (!user.correctPassword(req.body.password))
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

router.post('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(200);
});

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
