import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ENHANCEMENTS = 'GET_ENHANCEMENTS';
const UPDATE_ENHANCEMENT = 'UPDATE_ENHANCEMENT';
const CREATE_ENHANCEMENT = 'CREATE_ENHANCEMENT';

/**
 * ACTION CREATORS
 */
const getEnhancements = enhancements => ({ type: GET_ENHANCEMENTS, enhancements });
const update = enhancement => ({ type: UPDATE_ENHANCEMENT, enhancement });
const create = enhancement => ({ type: CREATE_ENHANCEMENT, enhancement });


/**
 * REDUCER
 */
export default function (enhancements = [], action) {
  switch (action.type) {

    case GET_ENHANCEMENTS:
      return action.enhancements;

    case UPDATE_ENHANCEMENT:
      return enhancements.map(enhancement => (
        action.enhancement.id === enhancement.id ? action.enhancement : enhancement
      ));

    case CREATE_ENHANCEMENT:
      return [action.enhancement, ...enhancements];

    default:
      return enhancements;
  }
}

/**
 * THUNK CREATORS
 */

export const fetchEnhancements = () => (dispatch) => {
  axios.get('/api/enhancements')
    .then(res => res.data)
    .then((enhancements) => {
      dispatch(getEnhancements(enhancements));
    })
    .catch(err => console.error('fetching animals unsucessful', err));
};

export const updateEnhancement = (updateObj) => (dispatch) => {
  const id = updateObj.id;
  axios.put(`/api/admin/enhancements/${id}`, updateObj)
    .then((res) => {
      dispatch(update(res.data));
    })
    .catch(err => console.error('updating enhancement unsucessful', err));
};

export const createEnhancement = createObj => (dispatch) => {
  axios.post('api/admin/enhancements', createObj)
    .then((res) => {
      dispatch(create(res.data));
    })
    .catch(err => console.error('unable to create enhancement', err))
};
