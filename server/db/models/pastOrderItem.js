const Sequelize = require('sequelize');
const db = require('../db');
const Animal = db.models.animal;
const Enhancement = db.models.enhancement;

console.log(db.models)

const PastOrderItem = db.define('pastOrderItem', {
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  hooks: {
    afterCreate: (inst) => {
      return Promise.all([
        Animal.findById(inst.animalId),
        Enhancement.findById(inst.enhancementId),
        inst,
      ])
        .then(([animal, enhancement, inst]) => {
          const newAnimalInventory = animal.inventory - inst.quantity;
          const newEnhancementInventory = enhancement.inventory - inst.quantity;
          return Promise.all([
            animal.update({ inventory: newAnimalInventory }),
            enhancement.update({ inventory: newEnhancementInventory }),
          ]);
        })
        .catch(console.error)
    },
  },
});

module.exports = PastOrderItem;
