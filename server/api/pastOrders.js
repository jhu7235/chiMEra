const router = require('express').Router();
const { PastOrder, PastOrderItem, User, Cart } = require('../db/models');

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  PastOrder.findAll({ where: { userId } })
    .then((pastOrders) => {
      if (!pastOrders) next(new Error('Orders not found'));
      res.json(pastOrders)
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new Error('User not found'));
      } else {
        const cartPromise = user.getCart();
        return Promise.all([cartPromise, user]);
      }
    })
    .then(([cart, user]) => {
      if (!cart) {
        next(new Error('Cart not found'));
      } else {
        const pastOrderPromise = PastOrder.create({ userId: user.id });
        return Promise.all([pastOrderPromise, cart]);
      }
    })
    .then(([pastOrder, cart]) => {
      cart.cartItems
    })
    .then((cart) => {
      return CartItem.create({ animalId, enhancementId, quantity, price, cartId: cart.id });
    })
    .then(cartItem => res.status(201).json(cartItem))
    .catch(next);
});

module.exports = router;

   // create a past order, set user
      // create pastOrderItems
      // add items to past order
      // delete cart
      // send pastOrder
