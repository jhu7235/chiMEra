import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ANIMALS = 'GET_ANIMALS';
const UPDATE_ANIMAL = 'UPDATE_ANIMAL';
const CREATE_ANIMAL = 'CREATE_ANIMAL';

/**
 * ACTION CREATORS
 */
const getAnimals = animals => ({ type: GET_ANIMALS, animals });
const update = animal => ({ type: UPDATE_ANIMAL, animal });
const create = animal => ({ type: CREATE_ANIMAL, animal });


/**
 * REDUCER
 */
export default function (animals = [], action) {
  switch (action.type) {
    case GET_ANIMALS:
      return action.animals;

    case UPDATE_ANIMAL:
      return animals.map(animal => (
        action.animal.id === animal.id ? action.animal : animal
      ));

    case CREATE_ANIMAL:
      return [action.animal, ...animals];

    default:
      return animals;
  }
}

/**
 * THUNK CREATORS
 */
export const fetchAnimals = () => (dispatch) => {
  return axios.get('/api/animals')
    .then(res => res.data)
    .then((animals) => {
      return dispatch(getAnimals(animals));
    })
    .catch(err => console.error('fetching animals unsucessful', err));
};

export const updateAnimal = updateObj => (dispatch) => {
  const id = updateObj.id;
  axios.put(`/api/admin/animals/${id}`, updateObj)
    .then((res) => {
      dispatch(update(res.data));
    })
    .catch(err => console.error('updating animal unsucessful', err));

}

export const createAnimal = createObj => (dispatch) => {
  axios.post('/api/admin/animals', createObj)
    .then((res) => {
      dispatch(create(res.data));
    })
    .catch(err => console.error('unable to create animal', err))
}

