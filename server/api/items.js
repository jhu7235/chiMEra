const router = require('express').Router();
const { User, Item } = require('../db/models');

// api/items/:id

router.get('/:id', (req, res, next) => {
  const userId = +req.params.id;
  Item.findAll({ where: { userId } })
    .then(items => res.json(items))
    .catch(next);
});

// api/items/

router.post('/', (req, res, next) => {
  Item.create(req.body)
  .then(item => res.json(item))
  .catch(next);
})


// api/items/admin/:id
// need a post so that the admin status is only sent by us in the front-end

router.post('/admin', (req, res, next) => {
  const adminStatus = req.body.adminStatus;
  if (adminStatus) {
    Item.findAll()
      .then(items => res.json(items))
      .catch(next);
  }
});

// api/item/:id/admin/:id
router.post(':id/admin', (req, res, next) => {
  const adminStatus = req.body.adminStatus;
  const id = req.params.id;
  if (adminStatus) {
    Item.findOne({ where: { id } })
      .then(item => res.json(item))
      .catch(next)
  }
});

module.exports = router;
