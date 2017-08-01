const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

router.post('/login', (req, res, next) => {
  if (req.user) {
    return next(new Error('user already logged in'));
  }
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        res.status(401).send('User not found');
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password');
      } else {
        req.login(user, err => err ? next(err) : res.json(user));
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  let { firstName, lastName } = req.body;
  const { email, password } = req.body;
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
  if (req.user) {
    return next(new Error('user already logged in'));
  }
  User.create({ firstName, lastName, email, password })
    .then(user => req.login(user, err => err ? next(err) : res.json(user)))
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError')
        res.status(401).send('User already exists');
      else next(err);
    });
});

router.post('/logout', (req, res, next) => {
  req.session.destroy(() => {
    req.logout();
    return res.redirect('/');
    // console.log('LOG OUT', req.user);
  });
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));