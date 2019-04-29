import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import {drawerReducer} from './drawer';

function root (history) {
  return combineReducers({
    drawer: drawerReducer,
    router: connectRouter(history)
  });
}

export default root;
