import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_CARTS = 'GET_CARTS';


/**
 * ACTION CREATORS
 */
const getCarts = carts => ({ type:GET_CARTS, carts });

/**
 * REDUCER
 */

export default function reducer(carts = [], action) {
  switch (action.type) {

    case GET_CARTS:
      return action.carts;

    default:
      return carts;
  }
}

/**
 * THUNK CREATORS
 */

export const fetchCarts = () => (dispatch) => {
  return axios.get('/api/admin/carts')
    .then(res => res.data)
    .then((carts) => {
      if (carts.length) dispatch(getCarts(carts));
      else dispatch(getCarts([]));
    })
    .catch(err => console.error('fetching carts unsucessful', err));
};

