import TableCell from '@material-ui/core/TableCell';
import React, {memo} from 'react';

function DataTableCell (props) {
  return (
    <TableCell {...props} />
  );
}

export default memo(DataTableCell);
