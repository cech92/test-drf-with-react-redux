import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, thunk))
);

export type AppDispatch = typeof store.dispatch;
