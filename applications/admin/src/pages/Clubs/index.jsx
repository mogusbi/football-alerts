import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import ClubsAdd from './ClubsAdd';
import ClubsList from './ClubsList';
import ClubsView from './ClubsView';

function Index () {
  return (
    <Fragment>
      <PageTitle title='Clubs' />

      <Route exact path='/clubs' component={ClubsList} />
      <Route exact path='/clubs/add' component={ClubsAdd} />
      <Route exact path='/clubs/view/:id' component={ClubsView} />
    </Fragment>
  );
}

export default Index;
