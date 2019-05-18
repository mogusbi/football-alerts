import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, {Fragment, memo} from 'react';
import PageTitle from '../../components/PageTitle';
import DashboardPod from './DashboardPod';

function Index ({match: {params: {clubId}}}) {
  return (
    <Fragment>
      <PageTitle title='Dashboard' />

      <Grid
        container
        spacing={24}
      >
        <Grid
          item
          md={4}
          sm={6}
          xs={12}
        >
          <DashboardPod
            content='View and manage club alert sources '
            link={`/clubs/${clubId}/sources`}
            title='Sources'
          />
        </Grid>

        <Grid
          item
          md={4}
          sm={6}
          xs={12}
        >
          <DashboardPod
            content='View and manage imported articles'
            link={`/clubs/${clubId}/articles`}
            title='Articles'
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

Index.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      clubId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default memo(Index)
