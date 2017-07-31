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

router.post('/', (req, res, next) => {
  const { shippingAddress, billingAddress, billingCardInfo } = req.body;
  req.user.getCart()
    .then((cart) => {
      if (!cart) {
        next(new Error('Cart not found'));
      } else {
        const pastOrderPromise = PastOrder.create({ billingCardInfo, userId: req.user.id });
        const shippingAddressPromise = Address.create(Object.assign(shippingAddress, { userId: req.user.id }));
        const billingAddressPromise = Address.create(Object.assign(billingAddress, { userId: req.user.id }));
        return Promise.all([pastOrderPromise, cart, shippingAddressPromise, billingAddressPromise]);
      }
    })
    .then(([pastOrder, cart, dbShippingAddress, dbBillingAddress]) => {
      const pastOrderItemPromises = cart.cartItems.map((cartItem) => {
        const { quantity, price, animalId, enhancementId } = cartItem;
        return PastOrderItem.create({ quantity, price, animalId, enhancementId });
      });
      pastOrder.setBillingAddress(dbBillingAddress);
      pastOrder.setShippingAddress(dbShippingAddress);
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

module.exports = router;
