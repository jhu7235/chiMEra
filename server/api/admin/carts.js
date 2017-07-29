const router = require('express').Router();
const { Cart } = require('../../db/models');

// api/admin/carts
router.get('/', (req, res, next) => {
  Cart.findAll()
    .then((carts) => {
      if (!carts) next(new Error('failure to get carts'))
      else res.json(carts);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Cart.findById(id)
    .then((cart) => {
      if (!cart) next(new Error('failure to find cart'))
      else res.json(cart);
    })
    .catch(next);
});

module.exports = router;
