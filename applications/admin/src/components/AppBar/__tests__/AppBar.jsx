import MenuItem from '@material-ui/core/MenuItem';
import {mount} from 'enzyme';
import React from 'react';
import AppBar from '../AppBar';

describe('AppBar', () => {
  let anchorEl;
  let handleAccountMenuClose;
  let handleAccountMenuOpen;
  let handleDrawer;
  let handleSignOut;
  let wrapper;

  beforeEach(() => {
    anchorEl= {
      getBoundingClientRect: jest.fn().mockReturnValue({
        top: 0
      })
    };
    handleAccountMenuClose = jest.fn();
    handleAccountMenuOpen = jest.fn();
    handleDrawer = jest.fn();
    handleSignOut = jest.fn();
    wrapper = mount(
      <AppBar
        anchorEl={anchorEl}
        handleAccountMenuClose={handleAccountMenuClose}
        handleAccountMenuOpen={handleAccountMenuOpen}
        handleDrawer={handleDrawer}
        handleSignOut={handleSignOut}
      />
    );
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleDrawer when hamburger button is clicked', () => {
    const hamburgerButton = wrapper.find('button[aria-label="Menu"]');

    hamburgerButton.simulate('click');

    expect(handleDrawer).toHaveBeenCalledTimes(1);
  });

  it('should call handleAccountMenuOpen when account button is clicked', () => {
    const accountButton = wrapper.find('button[aria-label="My account"]');

    accountButton.simulate('click');

    expect(handleAccountMenuOpen).toHaveBeenCalledTimes(1);
  });

  it('should call handleSignOut when sign out button is clicked', () => {
    const accountButton = wrapper.find('button[aria-label="My account"]');

    accountButton.simulate('click');

    const signOutButton = wrapper.find(MenuItem);

    signOutButton.simulate('click');

    expect(handleSignOut).toHaveBeenCalledTimes(1);
  });
});
