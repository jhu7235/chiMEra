import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import animals from './animals';
import enhancements from './enhancements';
import cart from './cart';

const reducer = combineReducers({ user, animals, enhancements, cart })
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));

const store = createStore(reducer, middleware);

export default store;
export * from './user';
// follow same convention and export forward

// also general note about structural consistency across files - each reducer file
// has a slightly different layout - please use a uniform structure!
