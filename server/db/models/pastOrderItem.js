const Sequelize = require('sequelize');
const db = require('../db');

const PastOrderItem = db.define('pastOrderItem', {
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = PastOrderItem;
