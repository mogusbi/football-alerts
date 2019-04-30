import {withAuthenticator} from 'aws-amplify-react';
import {ConnectedRouter} from 'connected-react-router';
import React from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import Layout from './containers/Layout';
import Clubs from './pages/Clubs';
import Dashboard from './pages/Dashboard';
import store, {history} from './store';


function App () {
  return (
    <Provider store={store()}>
      <ConnectedRouter history={history}>
        <Layout>
          <Route exact path='/' component={Dashboard} />
          <Route path='/clubs' component={Clubs} />
        </Layout>
      </ConnectedRouter>
    </Provider>
  );
}

export default withAuthenticator(App);
