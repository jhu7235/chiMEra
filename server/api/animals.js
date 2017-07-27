// respect the style guide - use spaces not tabs & other linting errors

const router = require('express').Router();
const { Animal } = require('../db/models');

// get all animals
router.get('/', (req, res, next) => {
	Animal.findAll()
	.then(animals => res.json(animals) )
	.catch( next );
});

// add new animal
router.post('/', (req, res, next) => {
	Animal.create(req.body) // be specific about fields you need (security)
	.then(animal => res.json(animal)) //201
	.catch(next);
});

// delete animal
router.delete('/', (req, res, next) => {
	Animal.destroy({where: req.body}) // be specific
	.then(() => res.sendStatus(200)) // 204 more descriptive
	.catch(next);
});

// get animal by id
router.get('/:id', (req, res, next) => {
	Animal.findById(req.params.id)
	.then(animal => res.json(animal)) // if animal not found?
	.catch(next);
});

module.exports = router;
