import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import {alertReducer} from './alert';
import {articleReducer} from './article';
import {clubReducer} from './club';
import {imageReducer} from './image';
import {layoutReducer} from './layout';
import {loaderReducer} from './loader';
import {messageReducer} from './message';
import {settingReducer} from './setting';
import {sourceReducer} from './source';

function root (history) {
  return combineReducers({
    alert: alertReducer,
    article: articleReducer,
    club: clubReducer,
    image: imageReducer,
    layout: layoutReducer,
    loader: loaderReducer,
    message: messageReducer,
    router: connectRouter(history),
    setting: settingReducer,
    source: sourceReducer
  });
}

export default root;
