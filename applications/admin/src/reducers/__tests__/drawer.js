import {closeDrawer, openDrawer} from '../../actions/DrawerActions';
import {drawerReducer, initialState} from '../drawer';

describe('drawerReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {};
      const result = drawerReducer(undefined, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('closeDrawer', () => {
    it('should set open to false', () => {
      const action = closeDrawer();
      const result = drawerReducer(undefined, action);

      expect(result).toEqual({
        open: false
      });
    });
  });

  describe('openDrawer', () => {
    it('should set open to true', () => {
      const action = openDrawer();
      const result = drawerReducer(undefined, action);

      expect(result).toEqual({
        open: true
      });
    });
  });
});
