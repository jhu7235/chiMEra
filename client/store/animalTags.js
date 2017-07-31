import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ANIMAL_TAG = 'GET_ANIMAL_TAG';
const ADD_ANIMAL_TAG = 'ADD_ANIMAL_TAG';
const REMOVE_ANIMAL_TAG = 'REMOVE_ANIMAL_TAG';

/**
 * ACTION CREATORS
 */
const getAnimalTags = tags => ({ type: GET_ANIMAL_TAG, tags });
const addAnimalTag = tag => ({ type: ADD_ANIMAL_TAG, tag });
const removeAnimalTag = tag => ({ type: REMOVE_ANIMAL_TAG, tag });

/**
 * REDUCER
 */

export default function reducer(animalTags = [], action) {
  switch (action.type) {
    case GET_ANIMAL_TAG:
      return action.tags;

    case ADD_ANIMAL_TAG:
      return [action.tag, ...animalTags];

    case REMOVE_ANIMAL_TAG:
      const removeIdx = animalTags.indexOf(animalTag => animalTag.id === action.tag.id);
      return animalTags.slice(0, removeIdx).concat(animalTags.slice(removeIdx + 1));

    default:
      return animalTags;
  }
}

/**
 * THUNK CREATORS
 */

export const fetchAnimalTags = () => (dispatch) => {
  return axios.get('/api/animal-tags')
    .then(res => res.data)
    .then((tags) => {
      dispatch(getAnimalTags(tags));
    })
    .catch(err => console.error('fetching tags unsucessful', err));
};

