import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Connect} from 'aws-amplify-react';
import {graphqlOperation} from 'aws-amplify';
import PropTypes from 'prop-types';
import React, {Fragment, memo} from 'react';
import Image from '../../components/Image';
import LinkButton from '../../components/LinkButton';
import Loader from '../../components/Loader';
import * as queries from '../../graphql/queries';

function ImagesView ({match: {params: {clubId, id}}}) {
  return (
    <Fragment>
      <Connect
        query={graphqlOperation(queries.getImage, {
          clubId,
          id
        })}
      >
        {
          ({data: {getImage}, loading}) => loading ? (
            <Loader loading={loading} />
          ) : getImage.images.map(({name}) => (
            <Fragment key={name}>
              <Typography
                gutterBottom
                component='h3'
                variant='h5'
              >
                {name}
                <Image
                  image={getImage}
                  size={name}
                  theme={{
                    photoImg: {
                      display: 'block',
                      maxWidth: '100%'
                    }
                  }}
                />
              </Typography>
            </Fragment>
          ))
        }
      </Connect>

      <Grid
        container
        justify='flex-end'
      >
        <Grid item>
          <LinkButton
            color='secondary'
            to={`/clubs/${clubId}/images`}
            variant='contained'
          >
            Cancel
          </LinkButton>
        </Grid>
      </Grid>
    </Fragment>
  );
}

ImagesView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      clubId: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default memo(ImagesView);
