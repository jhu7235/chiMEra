const Sequelize = require('sequelize');
const db = require('../db');

const Address = db.define('address', {

  streetAddress: {
    type: Sequelize.TEXT,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zipCode: {
    type: Sequelize.STRING,
  },
});

module.exports = Address;
