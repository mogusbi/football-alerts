import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import {alertReducer} from '../alert';
import {clubReducer} from '../club';
import {layoutReducer} from '../layout';
import {loaderReducer} from '../loader';
import {messageReducer} from '../message';
import {sourceReducer} from '../source';
import root from '../root';

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
      club: clubReducer,
      layout: layoutReducer,
      loader: loaderReducer,
      message: messageReducer,
      router: connectRouter(history),
      source: sourceReducer
    });
  });
});
