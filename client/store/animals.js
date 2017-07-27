import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ANIMALS = 'GET_ANIMALS';

/**
 * INITIAL STATE
 */
const defaultPets = []; // pets, animals, choose one

/**
 * ACTION CREATORS
 */
const getAnimals = animals => ({ type: GET_ANIMALS, animals });

/**
 * THUNK CREATORS
 */
export const fetchAnimals = () =>
  dispatch => {
    axios.get('/api/animals')
      .then(res => res.data)
      .then((animals) => {
        dispatch(getAnimals(animals));
      })
      .catch(err => console.log(err)); // might eventually want to handle errors differently
  }

/**
 * REDUCER
 */
export default function (state = defaultPets, action) {
  switch (action.type) {
    case GET_ANIMALS:
      return action.animals;
    default:
      return state;
  }
}
