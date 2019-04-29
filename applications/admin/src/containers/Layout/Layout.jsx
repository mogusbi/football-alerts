import Auth from '@aws-amplify/auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {closeDrawer, openDrawer} from '../../actions/DrawerActions';
import AppBar from '../../components/AppBar';
import AppDrawer from '../../components/AppDrawer';

function Layout ({children, closeDrawerHandler, open, openDrawerHandler}) {
  async function signOutHandler () {
    await Auth.signOut();
  }

  return (
    <Fragment>
      <AppBar
        handleDrawer={openDrawerHandler}
        handleSignOut={signOutHandler}
      />

      <AppDrawer
        isOpen={open}
        closeDrawer={closeDrawerHandler}
        openDrawer={openDrawerHandler}
      />

      <CssBaseline />

      {children}
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  closeDrawerHandler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  openDrawerHandler: PropTypes.func.isRequired
};

function mapStateToProps ({drawer: {open}}) {
  return {
    open
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeDrawerHandler () {
      return dispatch(closeDrawer());
    },
    openDrawerHandler () {
      return dispatch(openDrawer());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
