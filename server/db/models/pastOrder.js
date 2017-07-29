const Sequelize = require('sequelize');
const db = require('../db');
const pastOrderItem = require('./pastOrderItem');

const PastOrder = db.define('pastOrder', {

  creditNumber: {
    type: Sequelize.INTEGER,
    validate: {
      isCreditCard: true,
    },
  },
  creditExpiration: {
    type: Sequelize.TEXT,
    validate: {
      is: /^[0-9][0-9]\/[0-9][0-9]$/,
    },
  },
  creditCSV: {
    type: Sequelize.TEXT,
    validate: {
      is: /^[0-9][0-9][0-9]$/,
    },
  },
}, {
  defaultScope: {
    include: [
      { model: pastOrderItem },
    ],
  },
});

module.exports = PastOrder;
