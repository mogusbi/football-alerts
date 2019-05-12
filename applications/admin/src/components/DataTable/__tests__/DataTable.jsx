import {mount} from 'enzyme';
import React from 'react';
import DataTable from '../DataTable';
import DataTableCell from '../../DataTableCell';
import DataTableRow from '../../DataTableRow';

describe('DataTable', () => {
  let Children;
  let headings;
  let loadMoreHandler;
  let wrapper;

  beforeEach(() => {
    Children = () => (
      <DataTableRow>
        <DataTableCell>
          Row 1, column 1
        </DataTableCell>
        <DataTableCell>
          Row 1, column 2
        </DataTableCell>
        <DataTableCell align='right'>
          Row 1, action column
        </DataTableCell>
      </DataTableRow>
    );
    headings = [
      'Column 1',
      'Column 2'
    ];
    loadMoreHandler = jest.fn();
  });

  describe('with more data to load', () => {
    beforeEach(() => {
      wrapper = mount(
        <DataTable
          headings={headings}
          loadMore='load-more-key'
          loadMoreHandler={loadMoreHandler}
        >
          <Children />
        </DataTable>
      );
    });

    it('should render component', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('without more data to load', () => {
    beforeEach(() => {
      wrapper = mount(
        <DataTable
          headings={headings}
          loadMoreHandler={loadMoreHandler}
        >
          <Children />
        </DataTable>
      );
    });

    it('should render component', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
