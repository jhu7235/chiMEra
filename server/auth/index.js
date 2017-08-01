const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
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
  User.create({ firstName, lastName, email, password })
    .then(user => req.login(user, err => err ? next(err) : res.json(user)))
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError')
        res.status(401).send('User already exists');
      else next(err);
    });
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));