import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const updateUser = user => ({ type: UPDATE_USER, user });

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err));

export const signup = (email, password, repassword, firstName, lastName) =>
  (dispatch) => {
    if (password !== repassword) {
      const error = {
        passwordMismatch: true,
        response: { data: 'Password mismatch' },
      };
      return dispatch(getUser({ error }));
    }
    return axios.post('/auth/signup/', { email, password, firstName, lastName })
      .then((res) => {
        dispatch(getUser(res.data));
        history.goBack();
      })
      .catch(error =>
        dispatch(getUser({ error })));
  };

export const login = (email, password) =>
  dispatch =>
    axios.post('/auth/login', { email, password })
      .then((res) => {
        dispatch(getUser(res.data));
        history.goBack();
      })
      .then(() => axios.put('/api/cart/login'))
      .catch(error =>
        dispatch(getUser({ error })));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then((res) => {
        dispatch(removeUser());
        history.push('/');
      })
      .catch(err => console.log(err));

export const updateProfile = (firstName, lastName, email) =>
  dispatch =>
    axios.put('/api/user/', { firstName, lastName, email })
      .then((res) => {
        dispatch(updateUser(res.data));
      })
      .catch(console.log);
