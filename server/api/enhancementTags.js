const router = require('express').Router();
const { EnhancementTag } = require('../db/models');

router.get('/', (req, res, next) => {
  EnhancementTag.findAll()
    .then(enahancementTags => res.json(enahancementTags))
    .catch(next);
});


module.exports = router;
