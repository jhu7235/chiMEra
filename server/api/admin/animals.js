const router = require('express').Router();
const { Animal } = require('../../db/models');

// **********ANIMALS****************

// /api/admin/animals
router.get('/', (req, res, next) => {
  Animal.findAll()
    .then(animals => res.json(animals))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Animal.findById(req.params.id)
    .then(animal => res.json(animal))
    .catch(next);
});

// create animal
router.post('/', (req, res, next) => {
  const { name, description, imageUrl, tags, price } = req.body;
  Animal.create({
    name, description, imageUrl, tags, price,
  })
    .then(animal => res.json(animal))
    .catch(next);
});

// delete animal
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Animal.destroy({ where: { id } })
    .then(() => res.sendStatus(200))
    .catch(next);
});



module.exports = router;
