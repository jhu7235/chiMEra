const router = require('express').Router();
const { Animal } = require('../db/models');

// get all animals
router.get('/', (req, res, next) => {
  Animal.findAll()
    .then(animals => res.json(animals))
    .catch(next);
});


module.exports = router;
