const router = require('express').Router();
const { PastOrder } = require('../db/models');

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  PastOrder.findAll({ where: { userId } })
    .then((pastOrders) => {
      if (!pastOrders) next(new Error('Orders not found'));
      res.json(pastOrders);
    })
    .catch(next);
});

module.exports = router;
