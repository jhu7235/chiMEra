import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ENHANCEMENTS = 'GET_ENHANCEMENTS';

/**
 * INITIAL STATE
 */
const defaultEnhancements = [];

/**
 * ACTION CREATORS
 */
const getEnhancements = enhancements => ({ type: GET_ENHANCEMENTS, enhancements });

/**
 * THUNK CREATORS
 */
export const fetchEnhancements = () =>
  (dispatch) => {
    return axios.get('/api/enhancements')
      .then(res => res.data)
      .then((enhancements) => {
        dispatch(getEnhancements(enhancements));
      })
      .catch(err => console.log(err));
  }

/**
 * REDUCER
 */
export default function (state = defaultEnhancements, action) {
  switch (action.type) {
    case GET_ENHANCEMENTS:
      return action.enhancements;
    default:
      return state;
  }
}
