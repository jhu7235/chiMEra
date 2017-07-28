import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

/**
 * ACTION CREATORS
 */
const getCart = items => ({ type: GET_CART, items });
const addToCart = item => ({ type: ADD_TO_CART, item });
const removeFromCart = id => ({ type: REMOVE_FROM_CART, id });

// action reducers

export default function reducer(cart = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.items;

    case ADD_TO_CART:
      return [action.item, ...cart];

    case REMOVE_FROM_CART:
      return cart.filter(item => item.id !== action.id);

    default:
      return cart;
  }
}

export const fetchCart = () => (dispatch) => {
  axios.get('/api/cart')
    .then(res => res.data)
    .then((cart) => {
      console.log('Hi?');
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
