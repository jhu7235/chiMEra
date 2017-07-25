const router = require('express').Router();
const { Animal } = require('../db/models');

// get all animals
router.get('/', (req, res, next) => {
	Animal.findAll()
	.then( res.json )
	.catch( next );
});

// add new animal
router.post('/', (req, res, next) => {
	Animal.create(req.body)
	.then(res.json)
	.catch(next);
});

// delete animal
router.delete('/', (req, res, next) => {
	Animal.destroy({where: req.body})
	.then(() => res.sendStatus(200))
	.catch(next);
});

// get animal by id
router.get('/:id', (req, res, next) => {
	Animal.findById(req.params.id)
	.then(res.json)
	.catch(next);
});

module.exports = router;
