import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middeware = applyMiddleware(thunk, logger);
export const store = createStore(reducer, middeware);