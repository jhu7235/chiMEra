const Sequelize = require('sequelize');
const db = require('../db');
const pastOrderItem = require('./pastOrderItem');

const PastOrder = db.define('pastOrder', {

  shippingAddress: {
    type: Sequelize.TEXT,
  },
  billingAddress: {
    type: Sequelize.TEXT,
  },
  billingCardInfo: {
    type: Sequelize.TEXT,
  },
}, {
  defaultScope: {
    include: [
      { model: pastOrderItem },
    ],
  },
});

module.exports = PastOrder;
