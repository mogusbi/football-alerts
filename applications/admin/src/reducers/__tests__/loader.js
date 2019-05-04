import {loadingComplete, loadingStart} from '../../actions/LoaderActions';
import {loaderReducer, initialState} from '../loader';

describe('loaderReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {};
      const result = loaderReducer(undefined, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('loadingComplete', () => {
    it('should set loading to false', () => {
      const action = loadingComplete();
      const result = loaderReducer(undefined, action);

      expect(result).toEqual({
        loading: false
      });
    });
  });

  describe('loadingStart', () => {
    it('should set loading to true', () => {
      const action = loadingStart();
      const result = loaderReducer(undefined, action);

      expect(result).toEqual({
        loading: true
      });
    });
  });
});
