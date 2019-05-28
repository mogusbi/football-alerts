import React, {Fragment, memo} from 'react';
import {Route, Switch} from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import ArticlesEdit from './ArticlesEdit';
import ArticlesList from './ArticlesList';

function Index () {
  return (
    <Fragment>
      <PageTitle title='Articles' />

      <Switch>
        <Route
          component={ArticlesList}
          exact
          path='/clubs/:clubId/articles'
        />
        <Route
          component={ArticlesEdit}
          exact
          path='/clubs/:clubId/articles/:id/edit'
        />
      </Switch>
    </Fragment>
  );
}

export default memo(Index);
