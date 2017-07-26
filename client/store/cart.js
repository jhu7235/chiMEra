import axios from 'axios';

// Action types

const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// action Creators

const getCart = orders => ({ type: GET_CART, orders });
const addToCart = order => ({ type: ADD_TO_CART, order });
const removeFromCart = id => ({ type: REMOVE_FROM_CART, id });

// action reducers

export default function reducer(cart = [], action) {
  switch (action.type) {

    case GET_CART:
      return action.orders;

    case ADD_TO_CART:
      return [action.order, ...cart]

    case REMOVE_FROM_CART:
      return cart.filter(order => order.id !== action.id);

    default:
      return cart;

  }
}

export const fetchCart = (userId) => (dispatch) => {
  axios.get(`/api/orders/${userId}`)
    .then(res => dispatch(getCart(res.data)))
    .then(err => console.error('fetching cart unsucessful', err))
};

export const createOrder = (order) => (dispatch) => {
  axios.post(`/api/order`, order)
    .then(res => res.data)
    .then((createdOrder) => {
      dispatch(addToCart(createdOrder));
    });
};

export const removeOrder = (id) => (dispatch) => {
  dispatch(removeFromCart(id));
  axios.delete(`/api/order/${id}`)
    .catch(err => console.error('removing order unsucessful', err));
}
