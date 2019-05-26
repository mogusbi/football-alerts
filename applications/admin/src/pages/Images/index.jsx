import React, {Fragment, memo} from 'react';
import {Route, Switch} from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import ImagesList from './ImagesList';
import ImagesView from './ImagesView';

function Index () {
  return (
    <Fragment>
      <PageTitle title='Images' />

      <Switch>
        <Route
          component={ImagesList}
          exact
          path='/clubs/:clubId/images'
        />
        <Route
          component={ImagesView}
          exact
          path='/clubs/:clubId/images/:id/view'
        />
      </Switch>
    </Fragment>
  );
}

export default memo(Index);
