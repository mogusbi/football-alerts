import Auth from '@aws-amplify/auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {matchPath, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {clearAlert} from '../../actions/AlertActions';
import {closeAccountMenu, closeDrawer, openAccountMenu, openDrawer} from '../../actions/LayoutActions';
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
  closeAccountMenuHandler,
  closeDialogHandler,
  closeDrawerHandler,
  closeMessageHandler,
  history,
  layout,
  loader,
  message,
  openAccountMenuHandler,
  openDrawerHandler
}) {
  const match = matchPath(history.location.pathname, {
    path: '/clubs/:clubId'
  });

  return (
    <Fragment>
      <CssBaseline />

      <Loader loading={loader.loading} />

      <AppBar
        anchorEl={layout.accountMenu}
        handleAccountMenuClose={closeAccountMenuHandler}
        handleAccountMenuOpen={openAccountMenuHandler}
        handleDrawer={openDrawerHandler}
        handleSignOut={signOutHandler}
      />

      <AppDrawer
        closeDrawer={closeDrawerHandler}
        clubId={match && match.params.clubId}
        isOpen={layout.drawer}
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
  closeAccountMenuHandler: PropTypes.func.isRequired,
  closeDialogHandler: PropTypes.func.isRequired,
  closeDrawerHandler: PropTypes.func.isRequired,
  closeMessageHandler: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  layout: PropTypes.shape({
    accountMenu: PropTypes.object,
    drawer: PropTypes.bool.isRequired
  }).isRequired,
  loader: PropTypes.shape({
    loading: PropTypes.bool.isRequired
  }).isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired
  }).isRequired,
  openAccountMenuHandler: PropTypes.func.isRequired,
  openDrawerHandler: PropTypes.func.isRequired
};

function mapStateToProps ({alert, layout, loader, message}) {
  return {
    alert,
    layout,
    loader,
    message
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeAccountMenuHandler () {
      return dispatch(closeAccountMenu());
    },
    closeDialogHandler () {
      return dispatch(clearAlert());
    },
    closeDrawerHandler () {
      return dispatch(closeDrawer());
    },
    closeMessageHandler () {
      return dispatch(clearMessage());
    },
    openAccountMenuHandler (e) {
      return dispatch(openAccountMenu(e.currentTarget));
    },
    openDrawerHandler () {
      return dispatch(openDrawer());
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
