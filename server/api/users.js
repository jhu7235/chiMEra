const router = require('express').Router();
const { User } = require('../db/models');

module.exports = router;

// api/users
router.get('/', (req, res, next) => {
  // example about authorization - maybe only admins should be able to 
  // get all users - check req.user object to determine this
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email'],
  })
    .then(users => res.json(users))
    .catch(next);
});

// api/users/:id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  User.findOne({ where: { id } })
    .then(user => res.json(user))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  User.destroy({ where: { id } })
    .then(() => res.status(204).end)
    .catch(next);
})

