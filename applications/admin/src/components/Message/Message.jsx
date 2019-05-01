import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import React, {memo} from 'react';

function Message ({closeHandler, message, open}) {
  return (
    <Snackbar
      action={(
        <IconButton
          aria-label='Close'
          color='inherit'
          onClick={closeHandler}
          key='close'
        >
          <CloseIcon />
        </IconButton>
      )}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      autoHideDuration={6000}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={(
        <span id='message-id'>
          {message}
        </span>
      )}
      onClose={closeHandler}
      open={open}
    />
  );
}

Message.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
};

export default memo(Message);
