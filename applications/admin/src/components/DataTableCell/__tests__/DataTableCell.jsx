import {mount} from 'enzyme';
import React from 'react';
import DataTableCell from '../DataTableCell';

describe('DataTableCell', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <table>
        <tbody>
          <tr>
            <DataTableCell />
          </tr>
        </tbody>
      </table>
    );
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
