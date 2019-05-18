import React, {Fragment, memo} from 'react';
import {Route, Switch} from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import SourcesAdd from './SourcesAdd';
import SourcesEdit from './SourcesEdit';
import SourcesList from './SourcesList';

function Index () {
  return (
    <Fragment>
      <PageTitle title='Sources' />

      <Switch>
        <Route
          component={SourcesList}
          exact
          path='/clubs/:clubId/sources'
        />
        <Route
          component={SourcesAdd}
          exact
          path='/clubs/:clubId/sources/add'
        />
        <Route
          component={SourcesEdit}
          exact
          path='/clubs/:clubId/sources/:id/edit'
        />
      </Switch>
    </Fragment>
  );
}

export default memo(Index);
