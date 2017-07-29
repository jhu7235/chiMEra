const router = require('express').Router();
const { PastOrder, PastOrderItem, User, Cart } = require('../db/models');

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  PastOrder.findAll({ where: { userId } })
    .then((pastOrders) => {
      if (!pastOrders) next(new Error('Orders not found'));
      res.json(pastOrders);
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
      const pastOrderItemPromises = cart.cartItems.map((cartItem) => {
        const { quantity, price, animalId, enhancementId } = cartItem;
        return PastOrderItem.create({ quantity, price, animalId, enhancementId });
      });
      return Promise.all([cart, pastOrder, ...pastOrderItemPromises]);
    })
    .then(([cart, pastOrder, ...pastOrderItems]) => {
      const pastOrderWithItemsPromise = pastOrder.addPastOrderItems(pastOrderItems);
      return Promise.all([cart, pastOrderWithItemsPromise]);
    })
    .then(([cart, completedPastOrder]) => {
      cart.destroy();
      res.status(201).json(completedPastOrder)
    })
    .catch(next);
});

module.exports = router;
