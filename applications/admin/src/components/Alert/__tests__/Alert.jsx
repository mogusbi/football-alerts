import Button from '@material-ui/core/Button';
import {mount, shallow} from 'enzyme';
import React from 'react';
import Alert from '../Alert';

describe('Alert', () => {
  let closeHandler;
  let message;
  let open;
  let title;
  let wrapper;

  beforeEach(() => {
    closeHandler = jest.fn();
    title = 'Test alert';
    message = [
      'This is the first message',
      'This is the second message'
    ];
  });

  describe('when open', () => {
    beforeEach(() => {
      open = true;

      wrapper = shallow(
        <Alert
          closeHandler={closeHandler}
          message={message}
          open={open}
          title={title}
        />
      );
    });

    it('should render component', () => {
      expect(wrapper.dive()).toMatchSnapshot();
    });

    it('should call closeHandler when closed', () => {
      const closeButton = wrapper.find(Button);

      closeButton.simulate('click');

      expect(closeHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('when closed', () => {
    beforeEach(() => {
      open = false;

      wrapper = mount(
        <Alert
          closeHandler={closeHandler}
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
