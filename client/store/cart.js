import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const REMOVE_CART = 'REMOVE_CART';

/**
 * ACTION CREATORS
 */
const getCart = items => ({ type: GET_CART, items });
const addToCart = item => ({ type: ADD_TO_CART, item });
const removeFromCart = id => ({ type: REMOVE_FROM_CART, id });
export const removeCart = () => ({ type: REMOVE_CART });

/**
 * REDUCER
 */

export default function reducer(cart = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.items;

    case ADD_TO_CART:
      return [action.item, ...cart];

    case REMOVE_FROM_CART:
      return cart.filter(item => item.id !== action.id);

    case REMOVE_CART:
      return [];

    default:
      return cart;
  }
}

/**
 * THUNK CREATORS
 */

export const fetchCart = () => (dispatch) => {
  return axios.get('/api/cart')
    .then(res => res.data)
    .then((cart) => {
      if (cart.cartItems) dispatch(getCart(cart.cartItems));
      else dispatch(getCart([]));
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
  return axios.delete(`/api/cart/item/${id}`)
    .then(() => dispatch(removeFromCart(id)))
    .catch(err => console.error('removing item unsucessful', err));
}
