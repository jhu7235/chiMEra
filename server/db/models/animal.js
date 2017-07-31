const Sequelize = require('sequelize');
const db = require('../db');
const AnimalTag = require('./animalTag');


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
      { model: AnimalTag, as: 'tags' },
    ],
  },
});

module.exports = Animal;
