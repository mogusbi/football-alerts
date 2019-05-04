import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React, {memo} from 'react';

function Alert ({closeHandler, message, open, title}) {
  return (
    <Dialog
      aria-labelledby='alert-dialog-title'
      onClose={closeHandler}
      open={open}
    >
      <DialogTitle id='alert-dialog-title'>
        {title}
      </DialogTitle>
      <DialogContent>
        <List dense={false}>
          {
            message.map((item) => (
              <ListItem key={item}>
                <ListItemText>
                  {item}
                </ListItemText>
              </ListItem>
            ))
          }
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          onClick={closeHandler}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Alert.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  message: PropTypes.arrayOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default memo(Alert);
