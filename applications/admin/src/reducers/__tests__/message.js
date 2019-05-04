import {clearMessage, setMessage} from '../../actions/MessageActions';
import {messageReducer, initialState} from '../message';

describe('loaderReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {};
      const result = messageReducer(undefined, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('clearMessage', () => {
    it('should clear the alert from the state', () => {
      const action = clearMessage();
      const result = messageReducer(initialState, action);

      expect(result).toEqual({
        message: '',
        open: false
      });
    });
  });

  describe('setMessage', () => {
    it('should add the alert from the state', () => {
      const action = setMessage({
        message: 'This is a message'
      });
      const result = messageReducer(initialState, action);

      expect(result).toEqual({
        message: 'This is a message',
        open: true
      });
    });
  });
});
