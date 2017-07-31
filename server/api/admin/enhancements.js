const router = require('express').Router();
const { Enhancement } = require('../../db/models');

// **************ENHANCEMENTS************************
router.get('/', (req, res, next) => {
  Enhancement.findAll()
    .then((enhancements) => {
      if (!enhancements) next(new Error('Error acessing enhancements'));
      else res.json(enhancements);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Enhancement.findById(req.params.id)
    .then((enhancement) => {
      if (!enhancement) next(new Error('Enhancement not found'));
      else res.json(enhancement);
    })
    .catch(next);
});
// create enhancement
router.post('/', (req, res, next) => {
  const { name, description, imageUrl, tags, price } = req.body;

  Enhancement.create({ name, description, imageUrl, tags, price })
    .then((enhancement) => {
      if (!enhancement) next(new Error('failure to create enhancement'));
      else res.json(enhancement);
    })
    .catch(next);
});

// update enhancement
router.put('/:id', (req, res, next) => {
  const enhancementObj = req.body;
  const id = req.params.id;
  Object.keys(enhancementObj).forEach((key) => {
    if (enhancementObj[key] === undefined || enhancementObj[key] === '' || key === 'id') {
      delete enhancementObj[key];
    }
  });
  Enhancement.findById(id)
    .then((enhancement) => {
      if (!enhancement) next(new Error('Enhancement not found'));
      else return enhancement.update(enhancementObj);
    })
    .then(updatedEnhancement => res.json(updatedEnhancement))
    .catch(next);
});
// delete enhancement
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Enhancement.destroy({ where: { id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});


module.exports = router;
