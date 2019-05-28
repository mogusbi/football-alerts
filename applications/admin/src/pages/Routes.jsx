import React, {memo} from 'react';
import {Route, Switch} from 'react-router-dom';
import Articles from './Articles';
import Clubs from './Clubs';
import Images from './Images';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Sources from './Sources';

function Routes () {
  return (
    <Switch>
      <Route
        component={Articles}
        path='/clubs/:clubId/articles'
      />
      <Route
        component={Dashboard}
        exact
        path='/clubs/:clubId/dashboard'
      />
      <Route
        component={Images}
        path='/clubs/:clubId/images'
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
