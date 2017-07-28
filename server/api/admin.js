const router = require('express').Router();
const { Animal, Enhancement, User, Cart, CartItem, PastOrder, PastOrderItem } = require('../db/models');

// **ADMIN ONLY**
router.use('/', (req, res, next) => {
  if (!req.user.adminStatus) {
    res.sendStatus(401)
  }
  next();
})
// /api/admin/animal
router.get('/animals', (req, res, next) => {
  Animal.findAll()
    .then(animals => res.json(animals))
    .catch(next);
});

router.post('/animals', (req, res, next) => {
  Animal.create(req.body)
    .then(animal => res.json(animal))
    .catch(next);
});

// delete animal **ADMIN ONLY
router.delete('/animals', (req, res, next) => {
  Animal.destroy({ where: req.body })
    .then(() => res.sendStatus(200))
    .catch(next);
});

// get animal by id **NOT Necessary, possibly should be an update route
router.get('/animals/:id', (req, res, next) => {
  Animal.findById(req.params.id)
    .then(animal => res.json(animal))
    .catch(next);
});


module.exports = router;
