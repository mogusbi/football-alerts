import {routerMiddleware} from 'connected-react-router';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import history from './history';
import root from './reducers/root';

function store (initialState = {}) {
  return createStore(
    root(history),
    initialState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    )
  );
}

export default store;
