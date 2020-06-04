// Create redux store
import { createStore, applyMiddleware, compose } from 'redux';

import appReducer from './appReducer';

const middleware = process.env.NODE_ENV !== 'production' ?
    [
        require('redux-immutable-state-invariant').default(),
    ] :
    [];

const store = createStore(
    appReducer,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
);

export default store;