const Sequelize = require('sequelize');
const db = require('../db');

const EnhancementTag = db.define('enhancementTag', {
  tagName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = EnhancementTag;
