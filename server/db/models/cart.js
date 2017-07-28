const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  promoCode: {
    type: Sequelize.STRING,
    defaultValue: 'none',
  },
});

module.exports = Cart;
