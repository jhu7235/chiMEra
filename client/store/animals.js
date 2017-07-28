import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ANIMALS = 'GET_ANIMALS';

/**
 * ACTION CREATORS
 */
const getAnimals = animals => ({ type: GET_ANIMALS, animals });


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {

    case GET_ANIMALS:
      return action.animals;

    default:
      return state;
  }
}

/**
 * THUNK CREATORS
 */
export const fetchAnimals = () => (dispatch) => {
  axios.get('/api/animals')
    .then(res => res.data)
    .then((animals) => {
      dispatch(getAnimals(animals));
    })
    .catch(err => console.error("fetching animals unsucessful", err));
}
