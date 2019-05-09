import {closeAccountMenu, closeDrawer, openAccountMenu, openDrawer} from '../../actions/LayoutActions';
import {initialState, layoutReducer} from '../layout';

describe('layoutReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {};
      const result = layoutReducer(undefined, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('closeAccountMenu', () => {
    it('should set accountMenu to null', () => {
      const action = closeAccountMenu();
      const result = layoutReducer(initialState, action);

      expect(result).toEqual({
        accountMenu: null,
        drawer: false
      });
    });
  });

  describe('closeDrawer', () => {
    it('should set drawer to false', () => {
      const action = closeDrawer();
      const result = layoutReducer(initialState, action);

      expect(result).toEqual({
        accountMenu: null,
        drawer: false
      });
    });
  });

  describe('openAccountMenu', () => {
    it('should set accountMenu to true', () => {
      const action = openAccountMenu({});
      const result = layoutReducer(initialState, action);

      expect(result).toEqual({
        accountMenu: {},
        drawer: false
      });
    });
  });

  describe('openDrawer', () => {
    it('should set drawer to true', () => {
      const action = openDrawer();
      const result = layoutReducer(initialState, action);

      expect(result).toEqual({
        accountMenu: null,
        drawer: true
      });
    });
  });
});
