import React, {Fragment, memo} from 'react';
import {Route, Switch} from 'react-router-dom';
import Images from './Images';
import SettingsList from './SettingsList';
import SettingsSelection from './SettingsSelection';
import PageTitle from '../../components/PageTitle';

function Index () {
  return (
    <Fragment>
      <PageTitle title='Settings' />

      <Switch>
        <Route
          component={SettingsSelection}
          exact
          path='/settings'
        />
        <Route
          component={SettingsList}
          exact
          path='/settings/:type'
        />
        <Route
          component={Images}
          path='/settings/images'
        />
      </Switch>
    </Fragment>
  );
}

export default memo(Index);
