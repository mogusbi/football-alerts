import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import {alertReducer} from './alert';
import {drawerReducer} from './drawer';
import {loaderReducer} from './loader';
import {messageReducer} from './message';

function root (history) {
  return combineReducers({
    alert: alertReducer,
    drawer: drawerReducer,
    loader: loaderReducer,
    message: messageReducer,
    router: connectRouter(history)
  });
}

export default root;
