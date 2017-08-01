const router = require('express').Router();
const { Cart, CartItem } = require('../db/models');

const getSessionFromReq = (req) => {
  const Session = req.sessionStore.sessionModel;
  const sessionPromise = Session.find({ where: { sid: req.sessionID } });
  return sessionPromise;
};

router.get('/', (req, res, next) => {
  if (req.user) {
    Cart.findOrCreate({ where: { userId: req.user.id } })
      .then(([cart]) => res.json(cart))
      .catch(next);
  } else {
    const sessionCartId = req.session.cartId;
    Cart.findOrCreate({ where: { id: sessionCartId } })
      .then(([cart]) => {
        if (!sessionCartId) req.session.cartId = cart.id;
        return res.json(cart);
      })
      .catch(next);
  }
});

router.delete('/', (req, res, next) => {
  req.user.getCart().destroy()
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.put('/login-signup', (req, res, next) => {
  const sessionCartId = req.session.cartId;
  const userCartPromise = Cart.findOrCreate({ where: { id: req.user.id } });
  const sessionCartPromise = Cart.findById(sessionCartId);
  return Promise.all([userCartPromise, sessionCartPromise])
    .then(([userCartArray, sessionCart]) => {
      const sessionCartItems = sessionCart.cartItems;
      const userCart = userCartArray[0];
      if (sessionCartItems.length) {
        const userCartItemsPromiseArray =
          sessionCartItems.map(cartItem => {
            return cartItem.update({ cartId: userCart.id });
          });
        Promise.all(userCartItemsPromiseArray)
          .then((cartItems) => {
            return sessionCart.destroy();
          })
          .then(() => req.user.getCart())
          .then((userCart) => res.json(userCart))
          .catch(next);
      } else {
        return sessionCart.destroy()
          .then(() => res.json(userCart))
          .catch(next);
      }
    })
    .catch(next);
});

router.post('/item', (req, res, next) => {
  const { animalId, enhancementId, quantity, price } = req.body;
  let identifier = {};
  if (req.user) identifier = { userId: req.user.id };
  else identifier = { id: req.session.cartId };
  Cart.find({ where: identifier })
    .then((cart) => {
      if (!cart) return next(new Error('cart not found'));
      return CartItem.create({ animalId, enhancementId, quantity, price, cartId: cart.id });
    })
    .then(cartItem => res.status(201).json(cartItem))
    .catch(next);
});

router.put('/item/:itemId', (req, res, next) => {
  const { quantity } = req.body;
  CartItem.findById(req.params.itemId)
    .then((cartItem) => {
      console.log(cartItem)
      console.log(quantity)
      // if (!cartItem) next(new Error('Cart item not found'));
      // else
        return cartItem.update({ quantity });
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
