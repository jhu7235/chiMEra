const Sequelize = require('sequelize');
const db = require('../db');

const CartItem = db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = CartItem;
