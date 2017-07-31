const router = require('express').Router();
const { Enhancement } = require('../db/models');

// get all enhancements
router.get('/', (req, res, next) => {
  return Enhancement.findAll()
    .then(enhancements => res.json(enhancements))
    .catch(next);
});


module.exports = router;
