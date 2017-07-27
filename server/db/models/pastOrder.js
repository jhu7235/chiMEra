const Sequelize = require('sequelize');
const db = require('../db');

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
});

module.exports = PastOrder;
