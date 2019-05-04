import MenuItem from '@material-ui/core/MenuItem';
import {mount} from 'enzyme';
import React from 'react';
import AppBar from '../AppBar';

describe('AppBar', () => {
  let handleDrawer;
  let handleSignOut;
  let wrapper;

  beforeEach(() => {
    handleDrawer = jest.fn();
    handleSignOut = jest.fn();
    wrapper = mount(
      <AppBar
        handleDrawer={handleDrawer}
        handleSignOut={handleSignOut}
      />
    );
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleDrawer when hamburger is clicked', () => {
    const hamburgerButton = wrapper.find('button[aria-label="Menu"]');

    hamburgerButton.simulate('click');

    expect(handleDrawer).toHaveBeenCalledTimes(1);
  });

  it('should call handleSignOut when sign out button is clicked', () => {
    const accountButton = wrapper.find('button[aria-label="My account"]');

    accountButton.simulate('click');

    const signOutButton = wrapper.find(MenuItem);

    signOutButton.simulate('click');

    expect(handleSignOut).toHaveBeenCalledTimes(1);
  });
});
