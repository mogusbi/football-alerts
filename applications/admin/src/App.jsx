import {withAuthenticator} from 'aws-amplify-react';
import {ConnectedRouter} from 'connected-react-router';
import React from 'react';
import {Provider} from 'react-redux';
import Layout from './containers/Layout';
import store, {history} from './store';

function App () {
  return (
    <Provider store={store()}>
      <ConnectedRouter history={history}>
        <Layout>
          <p>Hello world</p>
        </Layout>
      </ConnectedRouter>
    </Provider>
  );
}

export default withAuthenticator(App);
