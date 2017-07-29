const router = require('express').Router();
const { PastOrder, PastOrderItem, User, Cart, Address } = require('../db/models');

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  PastOrder.findAll({ where: { userId } })
    .then((pastOrders) => {
      if (!pastOrders) next(new Error('Orders not found'));
      res.json(pastOrders);
    })
    .catch(next);
});

<<<<<<< HEAD
router.post('/', (req, res, next) => {
  const userId = req.user.id;
  const { shippingAddress, billingAddress, billingCardInfo } = req.body;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new Error('User not found'));
      } else {
        return user.getCart();
      }
    })
    .then((cart) => {
      console.log('Cart? ', cart)
      if (!cart) {
        next(new Error('Cart not found'));
      } else {
        const pastOrderPromise = PastOrder.create({ userId: req.user.id });
        const shippingAddressPromise = Address.create(shippingAddress);
        const billingAddressPromise = Address.create(billingAddress);
        return Promise.all([pastOrderPromise, cart, shippingAddress, billingAddress]);
      }
    })
    .then(([pastOrder, cart, shippingAddress, billingAddress]) => {
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
      res.status(201).json(completedPastOrder);
    })
    .catch(next);
});

=======
>>>>>>> master
module.exports = router;
