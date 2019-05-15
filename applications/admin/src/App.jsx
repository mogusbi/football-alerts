import {withAuthenticator} from 'aws-amplify-react';
import {ConnectedRouter} from 'connected-react-router';
import React, {memo} from 'react';
import {Provider} from 'react-redux';
import Layout from './containers/Layout';
import history from './history';
import Routes from './pages/Routes';
import store from './store';

function App () {
  return (
    <Provider store={store()}>
      <ConnectedRouter history={history}>
        <Layout>
          <Routes />
        </Layout>
      </ConnectedRouter>
    </Provider>
  );
}

export default withAuthenticator(memo(App));
