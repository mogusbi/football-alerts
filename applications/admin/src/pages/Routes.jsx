import React, {memo} from 'react';
import {Route, Switch} from 'react-router-dom';
import Clubs from './Clubs';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Sources from './Sources';

function Routes () {
  return (
    <Switch>
      <Route
        component={Dashboard}
        exact
        path='/clubs/:clubId/dashboard'
      />
      <Route
        component={Sources}
        path='/clubs/:clubId/sources'
      />
      <Route
        component={Settings}
        path='/settings'
      />
      <Route
        component={Clubs}
        path='/'
      />
    </Switch>
  );
}

export default memo(Routes);
