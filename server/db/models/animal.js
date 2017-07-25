const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const Animal = db.define('animal', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  tags: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

module.exports = Animal;

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */
