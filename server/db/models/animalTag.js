const Sequelize = require('sequelize');
const db = require('../db');

const AnimalTag = db.define('animalTag', {
  tagName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = AnimalTag;
