import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import ClubsAdd from './ClubsAdd';
import ClubsList from './ClubsList';

function Index () {
  return (
    <Fragment>
      <PageTitle title='Clubs' />

      <Route exact path='/clubs' component={ClubsList} />
      <Route exact path='/clubs/add' component={ClubsAdd} />
    </Fragment>
  );
}

export default Index;
