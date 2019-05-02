import TableRow from '@material-ui/core/TableRow';
import React, {memo} from 'react';

function DataTableRow (props) {
  return (
    <TableRow {...props} />
  );
}

export default memo(DataTableRow);
