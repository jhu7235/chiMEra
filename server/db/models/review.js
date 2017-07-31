const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
  },
  inspiredEmotion: {
    type: Sequelize.ENUM('brooding', 'fear', 'existential angst', 'qtness overload', 'glee', 'sorrow'),
  },
  fullDescription: {
    type: Sequelize.TEXT,
  },
});

module.exports = Review;
