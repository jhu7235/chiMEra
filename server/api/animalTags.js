const router = require('express').Router();
const { AnimalTag } = require('../db/models');

router.get('/', (req, res, next) => {
  AnimalTag.findAll()
    .then(animalsTags => res.json(animalsTags))
    .catch(next);
});


module.exports = router;
