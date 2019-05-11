import Dashboard from '@material-ui/icons/Dashboard';
import {mount} from 'enzyme';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ListItemLink from '../ListItemLink';

describe('ListItemLink', () => {
  let icon;
  let primary;
  let to;
  let wrapper;

  beforeEach(() => {
    icon = (<Dashboard />);
    primary = 'Dashboard';
    to = '/dashboard';
    wrapper = mount(
      <MemoryRouter>
        <ListItemLink
          icon={icon}
          primary={primary}
          to={to}
        />
      </MemoryRouter>
    );
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
