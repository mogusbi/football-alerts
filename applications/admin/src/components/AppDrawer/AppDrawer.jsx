import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import AppDrawerList from '../AppDrawerList';

function AppDrawer ({closeDrawer, isOpen, openDrawer}) {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={isOpen}
      onClose={closeDrawer}
      onOpen={openDrawer}
    >
      <div
        onClick={closeDrawer}
        onKeyDown={closeDrawer}
        role='button'
        tabIndex={0}
      >
        <AppDrawerList />
      </div>
    </SwipeableDrawer>
  );
}

AppDrawer.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  openDrawer: PropTypes.func.isRequired
};

AppDrawer.defaultProps = {
  isOpen: false
};

export default memo(AppDrawer);
