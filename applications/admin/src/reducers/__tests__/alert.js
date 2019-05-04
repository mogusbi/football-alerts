import {clearAlert, setAlert} from '../../actions/AlertActions';
import {alertReducer, initialState} from '../alert';

describe('alertReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {};
      const result = alertReducer(undefined, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('clearAlert', () => {
    it('should clear the alert from the state', () => {
      const action = clearAlert();
      const result = alertReducer(initialState, action);

      expect(result).toEqual({
        message: [],
        open: false,
        title: ''
      });
    });
  });

  describe('setAlert', () => {
    it('should add the alert from the state', () => {
      const action = setAlert({
        message: [
          'This is a message'
        ],
        title: 'Hello'
      });
      const result = alertReducer(initialState, action);

      expect(result).toEqual({
        message: [
          'This is a message'
        ],
        open: true,
        title: 'Hello'
      });
    });
  });
});
