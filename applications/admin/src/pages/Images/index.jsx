import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, {Fragment, memo, useEffect} from 'react';
import {connect} from 'react-redux';
import {getImages, nextImages} from '../../actions/ImageActions';
import Image from '../../components/Image';
import ImageLink from '../../components/ImageLink';
import PageTitle from '../../components/PageTitle';

function Index ({getImagesHandler, image, nextImagesHandler}) {
  const limit = 24;

  useEffect(() => {
    getImagesHandler(limit);
  }, [
    getImagesHandler
  ]);

  return (
    <Fragment>
      <PageTitle title='Images' />

      <Grid
        container
        spacing={24}
      >
        {
          image.images.map((image) => (
            <Grid
              item
              key={image.id}
              md={2}
              sm={3}
              xs={6}
            >
              <ImageLink to={`/images/${image.id}/view`}>
                <Image
                  image={image}
                  size='thumbnail'
                  theme={{
                    photoImg: {
                      display: 'block',
                      objectFit: 'cover',
                      width: '100%'
                    }
                  }}
                />
              </ImageLink>
            </Grid>
          ))
        }
      </Grid>

      {
        image.nextToken && (
          <Button
            aria-label='Load more...'
            color='primary'
            onClick={() => nextImagesHandler(limit, image.nextToken)}
            variant='contained'
          >
            Load more
          </Button>
        )
      }
    </Fragment>
  );
}

Index.propTypes = {
  getImagesHandler: PropTypes.func.isRequired,
  image: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
      }).isRequired).isRequired
    })),
    nextToken: PropTypes.string
  }).isRequired,
  nextImagesHandler: PropTypes.func.isRequired
};

function mapStateToProps ({image}) {
  return {
    image
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getImagesHandler (limit) {
      return dispatch(getImages(limit));
    },
    nextImagesHandler (limit, next) {
      return dispatch(nextImages(limit, next));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Index));
