import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import animals from './animals';
import enhancements from './enhancements';
import cart from './cart';
import animalTags from './animalTags';
import enhancementTags from './enhancementTags';
import pastOrders from './pastOrders';
import reviews from './reviews';


const reducer = combineReducers({ user, animals, enhancements, cart, pastOrders, animalTags, enhancementTags, reviews });

const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));

const store = createStore(reducer, middleware);

export default store;
export * from './user';
