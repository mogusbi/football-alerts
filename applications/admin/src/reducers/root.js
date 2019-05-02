import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import {alertReducer} from './alert';
import {clubReducer} from './club';
import {drawerReducer} from './drawer';
import {loaderReducer} from './loader';
import {messageReducer} from './message';

function root (history) {
  return combineReducers({
    alert: alertReducer,
    club: clubReducer,
    drawer: drawerReducer,
    loader: loaderReducer,
    message: messageReducer,
    router: connectRouter(history)
  });
}

export default root;
