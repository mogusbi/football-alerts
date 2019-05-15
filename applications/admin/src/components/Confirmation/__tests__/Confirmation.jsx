import {mount, shallow} from 'enzyme';
import React from 'react';
import Confirmation from '../Confirmation';

describe('Confirmation', () => {
  let closeHandler;
  let confirmHandler;
  let message;
  let open;
  let title;
  let wrapper;

  beforeEach(() => {
    closeHandler = jest.fn();
    confirmHandler = jest.fn();
    title = 'Test confirmation';
    message = 'This is a message';
  });

  describe('when open', () => {
    beforeEach(() => {
      open = true;

      wrapper = shallow(
        <Confirmation
          closeHandler={closeHandler}
          confirmHandler={confirmHandler}
          message={message}
          open={open}
          title={title}
        />
      );
    });

    it('should render component', () => {
      expect(wrapper.dive()).toMatchSnapshot();
    });

    it('should call closeHandler when cancelled', () => {
      const closeButton = wrapper.find('#confirmation-dialog-cancel');

      closeButton.simulate('click');

      expect(closeHandler).toHaveBeenCalledTimes(1);
    });

    it('should call closeHandler when confirmed', () => {
      const cancelButton = wrapper.find('#confirmation-dialog-yes');

      cancelButton.simulate('click');

      expect(confirmHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('when closed', () => {
    beforeEach(() => {
      open = false;

      wrapper = mount(
        <Confirmation
          closeHandler={closeHandler}
          confirmHandler={confirmHandler}
          message={message}
          open={open}
          title={title}
        />
      );
    });

    it('should render component', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
