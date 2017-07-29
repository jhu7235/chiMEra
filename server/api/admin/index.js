const router = require('express').Router();

module.exports = router;
// **ADMIN ONLY**
router.use('/', (req, res, next) => {
  if (!req.user.adminStatus) {
    res.sendStatus(401);
  }
  next();
});


router.use('/users', require('./users'));
router.use('/animals', require('./animals'));
router.use('/enhancements', require('./enhancements'));
router.use('/cart-items', require('./cartItems'));
router.use('/past-order-items', require('./pastOrderItems'));
router.use('/past-orders', require('./pastOrders'));
router.use('/carts', require('./carts'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
