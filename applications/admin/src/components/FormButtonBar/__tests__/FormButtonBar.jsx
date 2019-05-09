import {mount} from 'enzyme';
import React from 'react';
import FormButtonBar from '../FormButtonBar';

describe('FormButtonBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <FormButtonBar>
        <button type='button'>
          Test button
        </button>
      </FormButtonBar>
    );
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
