import {shallow} from 'enzyme';
import React from 'react';
import AppDrawer from '../AppDrawer';

describe('AppDrawer', () => {
  let closeDrawer;
  let openDrawer;
  let wrapper;

  beforeEach(() => {
    closeDrawer = jest.fn();
    openDrawer = jest.fn();
  });

  describe('when open', () => {
    beforeEach(() => {
      wrapper = shallow(
        <AppDrawer
          closeDrawer={closeDrawer}
          isOpen
          openDrawer={openDrawer}
        />
      );
    });

    it('should render component', () => {
      expect(wrapper.dive()).toMatchSnapshot();
    });

    it('should call closeDrawer when an item is clicked', () => {
      const listWrapper = wrapper.find('div[role="button"]');

      listWrapper.simulate('click');

      expect(closeDrawer).toHaveBeenCalledTimes(1);
    });
  });

  describe('when closed', () => {
    beforeEach(() => {
      wrapper = shallow(
        <AppDrawer
          closeDrawer={closeDrawer}
          isOpen={false}
          openDrawer={openDrawer}
        />
      );
    });

    it('should render component', () => {
      expect(wrapper.dive()).toMatchSnapshot();
    });
  });
});
