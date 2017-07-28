const router = require('express').Router();
const { CartItem } = require('../../db/models');

// api/admin/cartItems

router.get('/', (req, res, next) => {
  CartItem.findAll()
    .then(items => res.json(items))
    .catch(next);
});


// api/items/admin/:id

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  CartItem.findOne({ where: { id } })
    .then(items => res.json(items))
    .catch(next);
});


module.exports = router;
