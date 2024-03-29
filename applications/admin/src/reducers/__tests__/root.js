import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import {alertReducer} from '../alert';
import {articleReducer} from '../article';
import {clubReducer} from '../club';
import {imageReducer} from '../image';
import {layoutReducer} from '../layout';
import {loaderReducer} from '../loader';
import {messageReducer} from '../message';
import root from '../root';
import {settingReducer} from '../setting';
import {sourceReducer} from '../source';

describe('root', () => {
  let history;

  beforeEach(() => {
    history = {};
  });

  it('should connect React Router', () => {
    root(history);

    expect(connectRouter).toHaveBeenCalledWith(history);
  });

  it('should combine all of the correct reducers', () => {
    root(history);

    expect(combineReducers).toHaveBeenCalledWith({
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
  });
});
