import Grid from '@material-ui/core/Grid';
import {graphqlOperation} from 'aws-amplify';
import {Connect} from 'aws-amplify-react';
import PropTypes from 'prop-types';
import React, {Fragment, memo} from 'react';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';
import Pod from '../../components/Pod';
import * as queries from '../../graphql/queries';

function Index ({match: {params: {clubId}}}) {
  return (
    <Connect
      query={graphqlOperation(queries.dashboard, {
        id: clubId
      })}
    >
      {
        ({data: {getClub}, loading}) => loading ? (
          <Loader loading={loading} />
        ) : (
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
                <Pod
                  content='View and edit club details'
                  link={`/clubs/${clubId}/edit`}
                  title={getClub.name}
                />
              </Grid>

              <Grid
                item
                md={4}
                sm={6}
                xs={12}
              >
                <Pod
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
                <Pod
                  content='View and manage imported articles'
                  link={`/clubs/${clubId}/articles`}
                  title='Articles'
                />
              </Grid>
            </Grid>
          </Fragment>
        )
      }
    </Connect>
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
