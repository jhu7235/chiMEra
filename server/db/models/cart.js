const Sequelize = require('sequelize');
const db = require('../db');
const CartItem = require('./cartItem');

const Cart = db.define('cart', {
  promoCode: {
    type: Sequelize.STRING,
    defaultValue: 'none',
  },
}, {
  defaultScope: {
    include: [
      { model: CartItem },
    ],
  },
});

module.exports = Cart;
