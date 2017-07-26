import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});

/**
 * THUNK CREATORS
 */
// check who is logged in
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err));

export const signup = (email, password, repassword, firstName, lastName) =>
  dispatch =>
    {
      if(password !== repassword) {
        let error = {
          passwordMismatch: true,
          response: {data: 'Password mismatch'},
        };
        return dispatch(getUser({error}));
      }

      return axios.post("/auth/signup/", { email, password, firstName, lastName })
      .then(res => {
        dispatch(getUser(res.data));
        history.push('/home');
      })
      .catch(error =>
        dispatch(getUser({error})));
  };
// create session later

export const login = (email, password) =>
  dispatch =>
    axios.post("/auth/login", { email, password })
      .then(res => {
        dispatch(getUser(res.data));
        history.push('/home');
      })
      .catch(error =>
        dispatch(getUser({error})));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser());
        history.push('/login');
      })
      .catch(err => console.log(err));

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
