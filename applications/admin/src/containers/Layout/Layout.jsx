import Auth from '@aws-amplify/auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {clearAlert} from '../../actions/AlertActions';
import {closeDrawer, openDrawer} from '../../actions/DrawerActions';
import {clearMessage} from '../../actions/MessageActions';
import AppBar from '../../components/AppBar';
import AppDrawer from '../../components/AppDrawer';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const Main = styled.main`
  flex-grow: 1;
  overflow: auto;
  padding: 24px;
`;

const Outline = styled.main`
  flex-grow: 1;
  overflow: auto;
  padding: 24px;
`;

async function signOutHandler () {
  await Auth.signOut();
}

function Layout ({
   alert,
   children,
   closeDialogHandler,
   closeDrawerHandler,
   closeMessageHandler,
   drawer,
   loader,
   message,
   openDrawerHandler
}) {
  return (
    <Fragment>
      <CssBaseline />

      <Loader loading={loader.loading} />

      <AppBar
        handleDrawer={openDrawerHandler}
        handleSignOut={signOutHandler}
      />

      <AppDrawer
        isOpen={drawer.open}
        closeDrawer={closeDrawerHandler}
        openDrawer={openDrawerHandler}
      />

      <Outline>
        <Paper>
          <Main>
            {children}
          </Main>
        </Paper>
      </Outline>

      <Alert
        closeHandler={closeDialogHandler}
        message={alert.message}
        open={alert.open}
        title={alert.title}
      />

      <Message
        closeHandler={closeMessageHandler}
        message={message.message}
        open={message.open}
      />
    </Fragment>
  );
}

Layout.propTypes = {
  alert: PropTypes.shape({
    message: PropTypes.arrayOf(PropTypes.string).isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.node.isRequired,
  closeDialogHandler: PropTypes.func.isRequired,
  closeDrawerHandler: PropTypes.func.isRequired,
  closeMessageHandler: PropTypes.func.isRequired,
  drawer: PropTypes.shape({
    open: PropTypes.bool.isRequired
  }).isRequired,
  loader: PropTypes.shape({
    loading: PropTypes.bool.isRequired
  }).isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired
  }).isRequired,
  openDrawerHandler: PropTypes.func.isRequired
};

function mapStateToProps ({alert, drawer, loader, message}) {
  return {
    alert,
    drawer,
    loader,
    message
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeDialogHandler () {
      return dispatch(clearAlert());
    },
    closeDrawerHandler () {
      return dispatch(closeDrawer());
    },
    closeMessageHandler () {
      return dispatch(clearMessage());
    },
    openDrawerHandler () {
      return dispatch(openDrawer());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
