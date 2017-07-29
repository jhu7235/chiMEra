import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_PAST_ORDERS = 'GET_PAST_ORDERS';
const ADD_PAST_ORDER = 'ADD_PAST_ORDER';

/**
 * ACTION CREATORS
 */
const getPastOrders = orders => ({ type: GET_PAST_ORDERS, orders });
const addPastOrder = order => ({ type: ADD_PAST_ORDER, order });

/**
 * REDUCER
 */

export default function reducer(pastOrders = [], action) {
  switch (action.type) {
    case GET_PAST_ORDERS:
      return action.orders;

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
  axios.get('/api/cart')
    .then(res => res.data)
    .then((cart) => {
      dispatch(getCart(cart.cartItems));
    })
    .catch(err => console.error('fetching cart unsucessful', err));
};

export const createItem = itemObj => (dispatch) => {
  const { quantity, price, animalId, enhancementId } = itemObj;
  return axios.post('/api/cart/item', { quantity, price, animalId, enhancementId })
    .then(res => res.data)
    .then((createdItem) => {
      dispatch(addToCart(createdItem));
    })
    .catch(err => console.error('create item unsucessful', err));
};

export const removeItem = id => (dispatch) => {
  dispatch(removeFromCart(id));
  axios.delete(`/api/item/${id}`)
    .catch(err => console.error('removing item unsucessful', err));
}
