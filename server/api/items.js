const router = require('express').Router();
const { User, Item } = require('../db/models');

/* might be worth considering: items may only be relevant if it's associated with an
order or cart, so these routes are a bit strange to have. The only reason I can imagine
for a route to get a single item is if we send back populated versions (eager load)
so that it's more descriptive than what just a GET to /cart might give back */

// api/items/:id

router.get('/:id', (req, res, next) => {
  const userId = +req.params.id;
  Item.findAll({ where: { userId } })
    .then(items => res.json(items))
    .catch(next);
});

// api/items/

// again, 'POST'ing an item is only relevant to a specific cart/order, so it 
// might make most sense for it to be nested e.g. POST /cart/:cartid/items
router.post('/', (req, res, next) => {
  Item.create(req.body)
  .then(item => res.json(item))
  .catch(next);
})

/*

  there shouldn't need to be routes just for admins, there should just be logic
  inside already existing routes that allow or disallow users to do things 
  based on their permissions status.

*/

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
