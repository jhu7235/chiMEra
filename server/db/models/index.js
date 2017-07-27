const User = require('./user');
const Animal = require('./animal');
const Item = require('./item');
const Enhancement = require('./enhancement');
const Cart = require('./cart');
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Item.belongsTo(Animal);
Item.belongsTo(User);
Item.belongsTo(Enhancement);
Item.belongsTo(Cart);
Cart.hasMany(Item);
Cart.belongsTo(User);

module.exports = { User, Animal, Item, Enhancement, Cart };

