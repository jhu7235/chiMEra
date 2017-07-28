const router = require('express').Router();
const { Carts } = require('../../db/models');

// api/admin/past_Orders
router.get('/', (req, res, next) => {
  Carts.findAll()
    .then(pastOrders => res.json(pastOrders))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Carts.findOne({ where: { id } })
    .then(order => res.json(order))
    .catch(next);
});

module.exports = router;
