const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('pending', 'shipping', 'complete', 'processing'),
  },
  shippingAddress: {
    type: Sequelize.TEXT,
  },
  billingAddress: {
    type: Sequelize.TEXT,
  },
  billingCardInfo: {
    type: Sequelize.TEXT,
  },
});

module.exports = Cart;
