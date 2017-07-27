const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('pending', 'shipping', 'complete', 'processing'),
    /* should probably create a separate table for completed cart (e.g. invoice/order)
    because these two are actually probably different enough - e.g. 1 user = 1 cart,
    whereas 1 user = many past orders. Statuses should probably then be attached
    to orders rather than carts.*/
  },
  // addresses: possibly consider a separate table & associate
  shippingAddress: {
    type: Sequelize.TEXT,
  },
  billingAddress: {
    type: Sequelize.TEXT,
  },
  billingCardInfo: { // what exactly goes into this column?
    type: Sequelize.TEXT,
  },
});

module.exports = Cart;
