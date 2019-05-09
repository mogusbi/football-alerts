import {mount} from 'enzyme';
import React from 'react';
import PageTitle from '../PageTitle';

describe('PageTitle', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <PageTitle title='Test component' />
    );
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
