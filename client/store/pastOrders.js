import axios from 'axios';
import history from '../history';
import { removeCart } from './cart';

/**
 * ACTION TYPES
 */
const GET_PAST_ORDERS = 'GET_PAST_ORDERS';
const ADD_PAST_ORDER = 'ADD_PAST_ORDER';

/**
 * ACTION CREATORS
 */
const getPastOrders = pastOrders => ({ type: GET_PAST_ORDERS, pastOrders });
const addPastOrder = pastOrder => ({ type: ADD_PAST_ORDER, pastOrder });

/**
 * REDUCER
 */

export default function reducer(pastOrders = [], action) {
  switch (action.type) {
    case GET_PAST_ORDERS:
      return action.pastOrders;

    case ADD_PAST_ORDER:
      return [action.order, ...pastOrders];

    default:
      return pastOrders;
  }
}

/**
 * THUNK CREATORS
 */

export const fetchPastOrders = () => (dispatch) => {
  return axios.get('/api/past-orders')
    .then(res => res.data)
    .then((pastOrders) => {
      return dispatch(getPastOrders(pastOrders));
    })
    .catch(err => console.error('fetching cart unsucessful', err));
};

export const purchase = (shippingAddress, billingAddress, billingCardInfo) => (dispatch) => {
  return axios.post('/api/past-orders', { shippingAddress, billingAddress, billingCardInfo })
    .then(res => res.data)
    .then((createdPastOrder) => {
      dispatch(addPastOrder(createdPastOrder));
      dispatch(removeCart());
      history.push('/');
    })
    .catch(err => console.error('create item unsucessful', err));
};
