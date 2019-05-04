import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import {alertReducer} from '../alert';
import {clubReducer} from '../club';
import {drawerReducer} from '../drawer';
import {loaderReducer} from '../loader';
import {messageReducer} from '../message';
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
      drawer: drawerReducer,
      loader: loaderReducer,
      message: messageReducer,
      router: connectRouter(history)
    });
  });
});
