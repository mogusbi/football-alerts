import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import {alertReducer} from './alert';
import {clubReducer} from './club';
import {layoutReducer} from './layout';
import {loaderReducer} from './loader';
import {messageReducer} from './message';

function root (history) {
  return combineReducers({
    alert: alertReducer,
    club: clubReducer,
    layout: layoutReducer,
    loader: loaderReducer,
    message: messageReducer,
    router: connectRouter(history)
  });
}

export default root;
