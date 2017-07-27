// why this file when there's already user.js that does a lot of the auth stuff?


'use strict';
//Defining relevant constants to be used by our reducer
export const axios = require('axios'); // ???


//Constants
const USER_LOG_IN = 'USER_LOG_IN';


//Action Creators
const loginUser = user => ({ type: USER_LOG_IN, user});


//Reducer
export default (state = {}, action) => {
	let newState = Object.assign({}, state);

  switch (action.type) {

    case USER_LOG_IN:
	    newState.user = action.user;
      break;

    case USER_LOG_OUT:
      newState.user = {};
      break;

    default:
      break;

  }
	return newState;
};


//Thunk Creators
export const loginUserTC = (credential, history) => dispatch => {
  return axios.post('/api/auth/login', credential)
    .then( user => {
      console.log('LOGIN USER TC');
      if (!user) console.error('ISSUE LOGGING IN');
      history.push('/patient');
    } )
    .catch(console.error);
};
