import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import AppDrawerList from '../AppDrawerList';

function AppDrawer ({closeDrawer, clubId, isOpen, openDrawer}) {
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
        <AppDrawerList clubId={clubId} />
      </div>
    </SwipeableDrawer>
  );
}

AppDrawer.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  clubId: PropTypes.string,
  isOpen: PropTypes.bool,
  openDrawer: PropTypes.func.isRequired
};

AppDrawer.defaultProps = {
  clubId: null,
  isOpen: false
};

export default memo(AppDrawer);
