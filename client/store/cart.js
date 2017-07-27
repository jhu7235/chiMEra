import axios from 'axios';

// Action types

const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// action Creators

const getCart = items => ({ type: GET_CART, items });
const addToCart = item => ({ type: ADD_TO_CART, item });
const removeFromCart = id => ({ type: REMOVE_FROM_CART, id });

// action reducers

export default function reducer(cart = [], action) {
  switch (action.type) {

    case GET_CART:
      return action.items;

    case ADD_TO_CART:
      return [action.item, ...cart]

    case REMOVE_FROM_CART:
      return cart.filter(item => item.id !== action.id);

    default:
      return cart;

  }
}

export const fetchCart = (userId) => (dispatch) => {
  axios.get(`/api/items/${userId}`)
    .then(res => dispatch(getCart(res.data)))
    .then(err => console.error('fetching cart unsucessful', err)) //.catch not then
};

export const createItem = (item) => (dispatch) => {
  axios.post(`/api/item`, item)
    .then(res => res.data)
    .then((createdItem) => {
      dispatch(addToCart(createdItem));
    }); // don't forget to catch errors
};

export const removeItem = (id) => (dispatch) => {
  dispatch(removeFromCart(id)); // removeFromCart should only happen if server says it happened!
  axios.delete(`/api/item/${id}`)
    .catch(err => console.error('removing item unsucessful', err));
}
