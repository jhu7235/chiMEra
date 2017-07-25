const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Order;
