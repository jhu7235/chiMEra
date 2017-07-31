const router = require('express').Router();
const { Review } = require('../db/models');

// get all Reviews
router.get('/', (req, res, next) => {
  console.log('api reviews, hope i only get here once');
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next);
});
//add logic to this post to check to see if the user has that product in their purchase history
router.post('/', (req, res, next) => {
  const { rating, inspiredEmotion, animalId, enhancementId, userId, fullDescription } = req.body;
  Review.create({ rating, inspiredEmotion, animalId, enhancementId, userId, fullDescription })
    .then(review => res.status(201).json(review))
    .catch(next);
});

// get all animal reviews by animal
// get all enhancement reviews
// get all reviews for an animal/enhancement combo
router.get('/combos?', (req, res, next) => {
  Review.findAll({ where: { animalId: req.query.animalId, enhancementId: req.query.enhancementId } })
    .then(reviews => res.json(reviews))
    .catch(next);
});


module.exports = router;
