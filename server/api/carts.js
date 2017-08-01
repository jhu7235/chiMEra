const router = require('express').Router();
const { Cart, CartItem } = require('../db/models');

const getSessionFromReq = (req) => {
  const Session = req.sessionStore.sessionModel;
  const sessionPromise = Session.find({ where: { sid: req.sessionID } });
  return sessionPromise;
};

router.get('/', (req, res, next) => {
  const user = req.user;
  if (user) {
    Cart.findOrCreate({ where: { userId: user.id } })
      .then(([cart]) => res.json(cart))
      .catch(next);
  } else {
    getSessionFromReq(req)
      .then((session) => {
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
  req.user.getCart().destroy()
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.put('/login', (req, res, next) => {
  const sessionPromise = getSessionFromReq(req);
  const userCartPromise = req.user.getCart();
  Promise.all([sessionPromise, userCartPromise])
    .then(([session, userCart]) => {
      if (userCart) {
        // if user already have cart, point cartItem of unAuth user 
        // to user cart
        CartItem.findAll({ where: { cartId: session.cartId } })
          .then(sessionCartItems => sessionCartItems.map(cartItem => cartItem.update({ cartId: userCart.id })))
          .catch(next);
      } else if (!userCart) {
        // if user has no cart destroy, point cart to user and
        // erase cart from unauth user
        Cart.findById(session.cartId)
          .then((sessionCart) => {
            sessionCart.update({ userId: req.user.id });
            session.update({ cartId: null });
          })
          .catch(next);
      }
    })
    .catch(next);
});

router.post('/item', (req, res, next) => {
  const { animalId, enhancementId, quantity, price } = req.body;
  const user = req.user;
  new Promise((resolve) => {
    if (user) resolve({ userId: user.id });
    else {
      getSessionFromReq(req)
        .then(session => resolve({ id: session.cartId }))
        .catch(next);
    }
  })
    .then((identifier) => {
      Cart.find({ where: identifier })
        .then((cart) => {
          if (!cart) return next(new Error('cart not found'));
          return CartItem.create({ animalId, enhancementId, quantity, price, cartId: cart.id });
        })
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
