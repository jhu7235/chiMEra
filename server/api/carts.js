// respect the style guide

const router = require('express').Router();
const { Cart } = require('../db/models');

/* 

I imagine this file will change a bit when the schema is updated, but one suggestion
is to eager load data about items inside the carts

*/

router.get('/:userid', (req, res, next) => {
  const userId = +req.params.userid;
  Cart.findAll({ where: { userId } })
    .then(carts => res.json(carts))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Cart.create(req.body)
  .then(cart => res.json(cart)) // 201
  .catch(next);
});

router.delete('/', (req, res, next) => {
  Cart.destroy({ where: req.body })
  .then(() => res.sendStatus(200)) // 204
  .catch(next);
});

router.put('/:cartid', (req, res, next) => {
  Cart.findById(req.params.cartid)
  .then(cart => cart.update(req.body))
  .catch(next);
});
