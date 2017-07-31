const Sequelize = require('sequelize');
const db = require('../db');
const EnhancementTag = require('./enhancementTag');

const Enhancement = db.define('enhancement', {
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
      { model: EnhancementTag, as: 'tags' },
    ],
  },
});

module.exports = Enhancement;
