const router = require('express').Router();
const { Animal } = require('../../db/models');

// **********ANIMALS****************

// /api/admin/animals
router.get('/', (req, res, next) => {
  Animal.findAll()
    .then((animals) => {
      if (!animals) next(new Error('Error accessing animals'));
      else res.json(animals);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Animal.findById(req.params.id)
    .then((animal) => {
      if (!animal) next(new Error('Animal not found'));
      else res.json(animal);
    })
    .catch(next);
});

// create animal
router.post('/', (req, res, next) => {
  const { name, description, imageUrl, tags, price } = req.body;

  Animal.create({
    name, description, imageUrl, tags, price,
  })
    .then((animal) => {
      if (!animal) next(new Error('failure to create animal'));
      else res.json(animal);
    })
    .catch(next);
});

// update animal
router.put('/:id', (req, res, next) => {
  const animalObj = req.body;
  const id = req.params.id;
  Object.keys(animalObj).forEach((key) => {
    if (animalObj[key] === undefined || animalObj[key] === '' || key === 'id') {
      delete animalObj[key];
    }
  });
  Animal.findById(id)
    .then((animal) => {
      if (!animal) next(new Error('Animal not found'));
      else return animal.update(animalObj);
    })
    .then(updatedAnimal => res.json(updatedAnimal))
    .catch(next);
});


// delete animal
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Animal.destroy({ where: { id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
