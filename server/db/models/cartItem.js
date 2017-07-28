const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define('item', {
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Item;
