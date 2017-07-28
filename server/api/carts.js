const router = require('express').Router();
const { CartItem, User } = require('../db/models');

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .then((user) => {
      if (!user) next(new Error('User not found'));
      else return user.getCart();
    })
    .then((cart) => {
      if (!cart) next(new Error('No cart created'));
      else res.json(cart);
    })
    .catch(next);
});

router.delete('/', (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .then((user) => {
      if (!user) next(new Error('User not found'));
      else return user.getCart();
    })
    .then((cart) => {
      if (!cart) next(new Error('Cart not found'));
      else return cart.destroy();
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.post('/item', (req, res, next) => {
  const userId = req.user.id;
  const { animalId, enhancementId, quantity, price } = req.body;
  User.findById(userId)
    .then((user) => {
      const cartPromise = user.getCart();
      return Promise.all([cartPromise, user])
    })
    .then(([cart, user]) => {
      if (!cart) return user.addCart();
      return cart;
    })
    .then(cart => CartItem.create({
      where: { animalId, enhancementId, quantity, price, cartId: cart.id },
    }))
    .then(cartItem => res.status(201).json(cartItem))
    .catch(next);
});

router.put('/item/:itemId', (req, res, next) => {
  const { quantity } = req.body;
  CartItem.findById(req.params.itemId)
    .then((cartItem) => {
      if (!cartItem) next(new Error('Cart item not found'));
      else return cartItem.update({ quantity });
    })
    .then(updatedCartItem => res.json(updatedCartItem))
    .catch(next);
});

router.delete('/item/:itemId', (req, res, next) => {
  const itemId = req.params.itemId;
  CartItem.findById(itemId)
    .then((cartItem) => {
      if (!cartItem) next(new Error('Cart item not found'));
      else return cartItem.destroy;
    })
    .then(() => res.status(200).send(itemId))
    .catch(next);
});

module.exports = router;
