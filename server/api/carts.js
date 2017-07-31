const router = require('express').Router();
const { Cart, CartItem } = require('../db/models');

router.get('/', (req, res, next) => {
  const user = req.user;
  if (user) {
    const userId = req.user.id;
    Cart.findOrCreate({ where: userId })
      .then(cart => res.json(cart))
      .catch(next);
  }
  else {
    const Session = req.sessionStore.sessionModel;
    Session.find({ where: { sid: req.sessionID } })
      .then(session => {
        if (session.cartId) {
          return Cart.findById(session.cartId)
            .then(cart => res.json(cart))
            .catch(next);
        }
        return Cart.create()
          .then(cart => session.setCart(cart))
          .then(cart => res.json(cart))
          .catch(next);
      })
      .catch(next);
  }
});

router.delete('/', (req, res, next) => {
  const user = req.user;
  Cart.destroy({ where: { userId: user.id } })
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.post('/item', (req, res, next) => {
  const { animalId, enhancementId, quantity, price } = req.body;
  const user = req.user;
  new Promise((resolve) => {
    if (user) resolve({ userId: user.id });
    else {
      const Session = req.sessionStore.sessionModel;
      Session.findOne({ where: { sid: req.sessionID } })
        .then(session => resolve({ id: session.cartId }))
        .catch(next);
    }
  })
    .then((identifier) => {
      Cart.find({ where: identifier })
        .then(cart => CartItem.create({ animalId, enhancementId, quantity, price, cartId: cart.id }))
        .then(cartItem => res.status(201).json(cartItem))
        .catch(next);
    })
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
      if (!cartItem) return next(new Error('Cart item not found'));
      else return cartItem.destroy();
    })
    .then(() => res.status(200).send(itemId))
    .catch(next);
});

module.exports = router;
