import React, {Fragment, memo} from 'react';
import {Route, Switch} from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import ClubsAdd from './ClubsAdd';
import ClubsEdit from './ClubsEdit';
import ClubsList from './ClubsList';

function Index () {
  return (
    <Fragment>
      <PageTitle title='Clubs' />

      <Switch>
        <Route exact path='/' component={ClubsList} />
        <Route exact path='/add' component={ClubsAdd} />
        <Route exact path='/clubs/:id/edit' component={ClubsEdit} />
      </Switch>
    </Fragment>
  );
}

export default memo(Index);
