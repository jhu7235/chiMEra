const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
router.use('/animal', require('./animals'));
router.use('/enhancements', require('./enhancements'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
