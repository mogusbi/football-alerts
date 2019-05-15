import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React, {memo} from 'react';

function Confirmation ({closeHandler, confirmHandler, message, open, title}) {
  return (
    <Dialog
      aria-describedby='confirmation-dialog-description'
      aria-labelledby='confirmation-dialog-title'
      onClose={closeHandler}
      open={open}
    >
      <DialogTitle id='confirmation-dialog-title'>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='confirmation-dialog-description'>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          onClick={closeHandler}
          id='confirmation-dialog-cancel'
        >
          Cancel
        </Button>
        <Button
          color='primary'
          onClick={confirmHandler}
          id='confirmation-dialog-yes'
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Confirmation.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  confirmHandler: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default memo(Confirmation);
