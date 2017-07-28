const router = require('express').Router();
const { Animal } = require('../../db/models');

// **********ANIMALS****************

// /api/admin/animals
router.get('/', (req, res, next) => {
  Animal.findAll()
    .then(animals => res.json(animals))
    .catch(next);
});

// create animal
router.post('/', (req, res, next) => {
  Animal.create(req.body)
    .then(animal => res.json(animal))
    .catch(next);
});

// delete animals
router.delete('/', (req, res, next) => {
  Animal.destroy({ where: req.body })
    .then(() => res.sendStatus(200))
    .catch(next);
});

// get animal by id **NOT Necessary, possibly should be an update route
router.get('/:id', (req, res, next) => {
  Animal.findById(req.params.id)
    .then(animal => res.json(animal))
    .catch(next);
});


module.exports = router;
