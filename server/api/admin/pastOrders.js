const router = require('express').Router();
const { PastOrders } = require('../../db/models');

// api/admin/past_Orders
router.get('/', (req, res, next) => {
  PastOrders.findAll()
    .then(pastOrders => res.json(pastOrders))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  PastOrders.findOne({ where: { id } })
    .then(order => res.json(order))
    .catch(next);
});

module.exports = router;
