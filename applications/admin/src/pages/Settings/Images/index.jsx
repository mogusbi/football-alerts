import React, {memo} from 'react';
import {Switch, Route} from 'react-router-dom';
import ImagesAdd from './ImagesAdd';
import ImagesEdit from './ImagesEdit';

function Index () {
  return (
    <Switch>
      <Route
        component={ImagesAdd}
        exact
        path='/settings/images/add'
      />
      <Route
        component={ImagesEdit}
        exact
        path='/settings/images/:id/edit'
      />
    </Switch>
  );
}

export default memo(Index);
