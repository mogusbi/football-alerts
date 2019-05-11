import {shallow} from 'enzyme';
import React from 'react';
import Message from '../Message';

describe('Message', () => {
  let closeHandler;
  let message;
  let wrapper;

  beforeEach(() => {
    closeHandler = jest.fn();
    message = 'This is a test message';
  });

  describe('when open', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Message
          closeHandler={closeHandler}
          message={message}
          open
        />
      );
    });

    it('should render component', () => {
      expect(wrapper.dive()).toMatchSnapshot();
    });
  });

  describe('when closed', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Message
          closeHandler={closeHandler}
          message={message}
          open={false}
        />
      );
    });

    it('should render component', () => {
      expect(wrapper.dive()).toMatchSnapshot();
    });
  });
});
