const Sequelize = require('sequelize');
const db = require('../db');
const AnimalTag = require('./animalTag');

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
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  defaultScope: {
    include: [
      { model: AnimalTag },
    ],
  },
});

module.exports = Animal;
