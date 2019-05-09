import {mount} from 'enzyme';
import React from 'react';
import DataTableRow from '../DataTableRow';

describe('DataTableRow', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <table>
        <tbody>
          <DataTableRow />
        </tbody>
      </table>
    );
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
