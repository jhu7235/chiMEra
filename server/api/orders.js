const router = require('express').Router();
const { User, Order } = require('../db/models');

// api/orders/:id

router.get('/:id', (req, res, next) => {
  const userId = +req.params.id;
  Order.findAll({ where: { userId } })
    .then(orders => res.json(orders))
    .catch(next);
});


// api/orders/admin/:id
// need a post so that the admin status is only sent by us in the front-end

router.post('/admin', (req, res, next) => {
  const adminStatus = req.body.adminStatus;
  if (adminStatus) {
    Order.findAll()
      .then(orders => res.json(orders))
      .catch(next);
  }
});

// api/order/:id/admin/:id
router.post(':id/admin', (req, res, next) => {
  const adminStatus = req.body.adminStatus;
  const id = req.params.id;
  if (adminStatus) {
    Order.findOne({ where: { id } })
      .then(order => res.json(order))
      .catch(next)
  }
});

module.exports = router;
