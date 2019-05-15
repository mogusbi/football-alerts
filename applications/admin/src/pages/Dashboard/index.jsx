import React, {Fragment, memo} from 'react';
import PageTitle from '../../components/PageTitle';

function Index () {
  return (
    <Fragment>
      <PageTitle title='Dashboard' />
    </Fragment>
  );
}

export default memo(Index)
