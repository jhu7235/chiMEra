const Sequelize = require('sequelize');
const db = require('../db');

const PastOrder = db.define('pastOrder', {

  billingCardInfo: {
    type: Sequelize.TEXT,
  },
});

module.exports = PastOrder;
