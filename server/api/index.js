const router = require('express').Router();

module.exports = router;

router.use('/animals', require('./animals'));
router.use('/animal-tags', require('./animalTags'));
router.use('/enhancements', require('./enhancements'));
router.use('/enhancement-tags', require('./enhancementTags'));
router.use('/admin', require('./admin'));
router.use('/cart', require('./carts'));
router.use('/user', require('./user'));
router.use('/past-orders', require('./pastOrders'));
router.use('/reviews', require('./reviews'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
