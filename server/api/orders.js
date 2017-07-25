const router = require('express').Router();
const { User, Orders } = require('../db/models');

// api/orders/:id

router.get('/:id', (req, res, next) => {
  const userId = req.params.id;
  Orders.findAll({ where: { userId } })
    .then(orders => res.json(orders))
    .catch(next);
});


// api/orders/admin/:id
// need a post so that the admin status is only sent by us in the front-end

router.post('/admin', (req, res, next) => {
  const adminStatus = req.body.adminStatus;
  if (adminStatus) {
    Orders.findAll()
      .then(orders => res.json(orders))
      .catch(next);
  }
});

// api/order/:id/admin/:id
router.post(':id/admin', (req, res, next) => {
  const adminStatus = req.body.adminStatus;
  const id = req.params.id;
  if (adminStatus) {
    Orders.findOne({ where: { id } })
      .then(order => res.json(order))
      .catch(next)
  }
});
