const router = require('express').Router();
const { PastOrder, PastOrderItem, Cart, Address } = require('../db/models');

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  PastOrder.findAll({ where: { userId },
    include: [
      // { model: PastOrderItem },
      { model: Address, as: 'billingAddress' },
      { model: Address, as: 'shippingAddress' },
    ],
  })
    .then((pastOrders) => {
      if (!pastOrders) next(new Error('Orders not found'));
      // const pastOrderWithItems = pastOrders.map(pastOrder => pastOrder.getPastOrderItems());
      // const pastOrderBillingAddress = pastOrder.map(pastOrder => pastOrder.getBillingAddress());
      // const pastOrderShippingAddress = pastOrder.map(pastOrder => pastOrder.getShippingAddress());
      res.json(pastOrders);
    })
    .catch(next);
});

module.exports = router;
