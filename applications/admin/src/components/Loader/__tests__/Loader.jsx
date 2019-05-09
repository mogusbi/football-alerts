import {mount} from 'enzyme';
import React from 'react';
import Loader from '../Loader';

describe('Loader', () => {
  let wrapper;

  it('should render component when loading', () => {
    wrapper = mount(
      <Loader loading />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should not render component when loading', () => {
    wrapper = mount(
      <Loader loading={false} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
