const Sequelize = require('sequelize');
const db = require('../db');
const pastOrderItem = require('./pastOrderItem');

const PastOrder = db.define('pastOrder', {
  creditNumber: {
    type: Sequelize.STRING,
    // validate: {
    //   isCreditCard: true,
    // },
    // allowNull: false,
  },
  creditExpiration: {
    type: Sequelize.TEXT,
    validate: {
      is: /^[0-9][0-9]\/[0-9][0-9]$/,
    },
    // allowNull: false,
  },
  creditCSV: {
    type: Sequelize.TEXT,

    validate: {
      is: /^[0-9][0-9][0-9]$/,
    },
    // allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('processing', 'shipped', 'completed'),
    // allowNull: false,

  },
}, {
  defaultScope: {
    include: [
      { model: pastOrderItem },
    ],
  },
});

module.exports = PastOrder;
