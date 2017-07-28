const router = require('express').Router();
const { PastOrderItem } = require('../../db/models');

// api/admin/cartItems

router.get('/', (req, res, next) => {
  PastOrderItem.findAll()
    .then(items => res.json(items))
    .catch(next);
});


// api/items/admin/:id

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  PastOrderItem.findOne({ where: { id } })
    .then(items => res.json(items))
    .catch(next);
});


module.exports = router;
