import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';
const REMOVE_REVIEW = 'REMOVE_REVIEW';

/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({ type: GET_REVIEWS, reviews });
const addReview = review => ({ type: ADD_REVIEW, review });
const removeReview = id => ({ type: REMOVE_REVIEW, id });
//export const removeReview = () => ({ type: REMOVE_Review });

/**
 * REDUCER
 */

export default function reducer(reviews = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;

    case ADD_REVIEW:
      return [action.review, ...reviews];

    case REMOVE_REVIEW:
      return reviews.filter(review => review.id !== action.id);

    default:
      return reviews;
  }
}

/**
 * THUNK CREATORS
 */

export const fetchReviews = () => (dispatch) => {
  return axios.get('/api/reviews')
    .then(res => res.data)
    .then((reviews) => {
      console.log('reviews in fetch', reviews)
      dispatch(getReviews(reviews));
    })
    .catch(err => console.error('fetching reviews unsucessful', err));
};

export const createReview = reviewObj => (dispatch) => {
  const { rating, inspiredEmotion, animalId, enhancementId, userId, fullDescription } = reviewObj;
  return axios.post('/api/reviews', { rating, inspiredEmotion, animalId, enhancementId, userId, fullDescription })
    .then(res => res.data)
    .then((createdReview) => {
      dispatch(addReview(createdReview));
    })
    .catch(err => console.error('create review unsucessful', err));
};
