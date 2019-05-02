import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import styled from 'styled-components';
import DataTableCell from '../DataTableCell';
import DataTableRow from '../DataTableRow';

const Wrapper = styled.div`
  margin: 24px 0 0;
`;

function DataTable ({children, headings, loadMore, loadMoreHandler}) {
  return (
    <Wrapper>
      <Table>
        <TableHead>
          <DataTableRow>
            {
              headings.map(
                (heading) => (
                  <DataTableCell key={heading}>
                    {heading}
                  </DataTableCell>
                )
              )
            }
          </DataTableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
        {
          loadMore && (
            <TableFooter>
              <DataTableRow>
                <DataTableCell
                  align='center'
                  colSpan={headings.length}
                >
                  <Wrapper>
                    <Button
                      aria-label='Load more...'
                      color='primary'
                      onClick={loadMoreHandler}
                      variant='contained'
                    >
                      Load more
                    </Button>
                  </Wrapper>
                </DataTableCell>
              </DataTableRow>
            </TableFooter>
          )
        }
      </Table>
    </Wrapper>
  );
}

DataTable.propTypes = {
  children: PropTypes.node.isRequired,
  headings: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadMore: PropTypes.string,
  loadMoreHandler: PropTypes.func.isRequired
};

DataTable.defaultProps = {
  loadMore: null
};

export default memo(DataTable);
