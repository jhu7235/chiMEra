const Sequelize = require('sequelize');
const db = require('../db');

// use for validation eventually
// const tags = ['domestic', 'exotic', 'feline', 'canine', 'small', 'aquatic', 'bird', 'dangerous'];

const Animal = db.define('animal', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
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

module.exports = Animal;
