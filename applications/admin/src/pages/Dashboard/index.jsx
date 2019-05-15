import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {Fragment, memo} from 'react';
import LinkButton from '../../components/LinkButton';
import PageTitle from '../../components/PageTitle';

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
          <Card>
            <CardContent>
              <Typography
                component='h3'
                gutterBottom
                variant='h5'
              >
                Articles
              </Typography>

              <Typography component='p'>
                View and manage imported articles
              </Typography>
            </CardContent>
            <CardActions>
              <LinkButton
                color='primary'
                size='small'
                to={`/clubs/${clubId}/articles`}
              >
                Go to articles
              </LinkButton>
            </CardActions>
          </Card>
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
