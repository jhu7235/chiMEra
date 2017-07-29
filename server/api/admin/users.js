const router = require('express').Router();
const { User } = require('../../db/models');


// api/admin/users
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email'],
  })
    .then(users => res.json(users))
    .catch(next);
});

// api/admin/users/:id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then(user => res.json(user))
    .catch(next);
});

// ** Admin create admin **
// api/admin/users/:id
router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then(user => user.update({ adminStatus: true }))
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});


// ** Delete User **
// api/admin/users/:id
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  User.destroy(id)
    .then(() => res.status(204).end)
    .catch(next);
});

// ** Delete User Cart **
// api/admin/users/:id/cart
router.delete('/:id/cart', (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (!user) next(new Error('user not found'))
      else return user.getCart();
    })
    .then((userCart) => {
      if (!userCart) next(new Error('cart not found'));
      else return userCart.destroy();
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;
