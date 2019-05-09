import {mount} from 'enzyme';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import LinkButton from '../LinkButton';

describe('LinkButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <LinkButton to='/somewhere'>
          A link button
        </LinkButton>
      </MemoryRouter>
    );
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
