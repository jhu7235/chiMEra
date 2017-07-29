const User = require('./user');
const Animal = require('./animal');
const CartItem = require('./cartItem');
const Enhancement = require('./enhancement');
const Cart = require('./cart');
const PastOrder = require('./pastOrder');
const PastOrderItem = require('./pastOrderItem');
const Address = require('./address');

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


CartItem.belongsTo(Animal);
CartItem.belongsTo(Enhancement);
CartItem.belongsTo(Cart);
Cart.hasMany(CartItem, { onDelete: 'cascade', hooks: true });
User.belongsTo(Cart);



PastOrderItem.belongsTo(Animal);
PastOrderItem.belongsTo(Enhancement);
PastOrderItem.belongsTo(PastOrder);
PastOrder.hasMany(PastOrderItem, { onDelete: 'cascade', hooks: true });
PastOrder.belongsTo(User);

Address.belongsTo(User);
PastOrder.belongsTo(Address, { as: 'shippingAddress' });
PastOrder.belongsTo(Address, { as: 'billingAddress' });


module.exports = { User, Animal, CartItem, Enhancement, Cart, PastOrder, PastOrderItem, Address };

