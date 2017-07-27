const Sequelize = require('sequelize');
const db = require('../db');

const Enhancement = db.define('enhancement', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false, // unnecessary new line

  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Enhancement;

// again with removing empty comments

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */
