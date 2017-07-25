const router = require('express').Router();
const { Enhancement } = require('../db/models');

// get all enhancements
router.get('/', (req, res, next) => {
	Enhancement.findAll()
	.then( res.json )
	.catch( next );
});

// add new enhancements
router.post('/', (req, res, next) => {
	Enhancement.create(req.body)
	.then(res.json)
	.catch(next);
});

// delete enhancement
router.delete('/', (req, res, next) => {
	Enhancement.destroy({where: req.body})
	.then(() => res.sendStatus(200))
	.catch(next);
});

// get by id
router.get('/:id', (req, res, next) => {
	Enhancement.findById(req.params.id)
	.then(res.json)
	.catch(next);
});

module.exports = router;
