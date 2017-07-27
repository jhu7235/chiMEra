const Sequelize = require('sequelize');
const db = require('../db');

const Animal = db.define('animal', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false, // unnecessary new line below

  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT), // STRING probably better for this column
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Animal;

// remove these comments if they're not to be used

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */
