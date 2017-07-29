const router = require('express').Router();
const { PastOrderItem } = require('../../db/models');

// api/admin/cartItems

router.get('/', (req, res, next) => {
  PastOrderItem.findAll()
    .then((items) => {
      if (!items) next(new Error('Error getting past order items'))
      else res.json(items);
    })
    .catch(next);
});


router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  PastOrderItem.findById(id)
    .then((items) => {
      if (!items) next(new Error('Purchased Item not found'))
      else res.json(items);
    })
    .catch(next);
});

module.exports = router;
