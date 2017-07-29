const router = require('express').Router();
const { PastOrders } = require('../../db/models');

// api/admin/past_Orders
router.get('/', (req, res, next) => {
  PastOrders.findAll()
    .then((pastOrders) => {
      if (!pastOrders) next(new Error('unable to access orders'));
      else res.json(pastOrders)
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  PastOrders.findById(id)
    .then((order) => {
      if (!order) next(new Error('unable to find order'));
      else res.json(order);
    })
    .catch(next);
});

router.put('/past-orders/:id', (req, res, next) => {
  const orderObj = req.body;
  const id = req.params.id;
  Object.keys(orderObj).forEach((key) => {
    if (orderObj[key] === undefined) {
      delete orderObj[key];
    }
  });
  PastOrders.findById(id)
    .then((order) => {
      if (!order) next(new Error('unable to find order'))
      else return order.update(orderObj)
    })
    .then(updatedOrder => res.json(updatedOrder))
    .catch(next)
})

module.exports = router;
