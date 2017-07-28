const router = require('express').Router();

module.exports = router;

router.use('/animals', require('./animals'));
router.use('/enhancements', require('./enhancements'));
router.use('/admin', require('./admin'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
