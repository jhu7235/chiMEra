const router = require('express').Router();
const { User } = require('../db/models');

// api/users/:id
router.put('/', (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  console.log('API USER', firstName, lastName, email);
  const user = req.user;
  user.update({ firstName, lastName, email })
    .then((user) => {
      return res.json(user);
    })
    .catch(next);
});

module.exports = router;
