const router = require('express').Router();
const { CartItem } = require('../../db/models');

// api/admin/cartItems

router.get('/', (req, res, next) => {
  CartItem.findAll()
    .then((items) => {
      if (!items) next(new Error('Items not found'))
      else res.json(items)
    })
    .catch(next);
});


// api/items/admin/:id

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  CartItem.findById(id)
    .then((item) => {
      if (!item) next(new Error('Cart item not found'))
      else res.json(item);
    })
    .catch(next);
});


module.exports = router;
