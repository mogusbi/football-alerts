import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, {Fragment, memo, useEffect} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {getImages, nextImages} from '../../actions/ImageActions';
import Image from '../../components/Image';
import ImageLink from '../../components/ImageLink';

const ButtonBar = styled.div`
  margin: 24px 0 0;
  text-align: center;
`;

function ImagesList ({getImagesHandler, image, match: {params: {clubId}}, nextImagesHandler}) {
  const limit = 24;

  useEffect(() => {
    getImagesHandler(limit);
  }, [
    getImagesHandler
  ]);

  return (
    <Fragment>
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
              <ImageLink to={`/clubs/${clubId}/images/${image.id}/view`}>
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
          <ButtonBar>
            <Button
              aria-label='Load more...'
              color='primary'
              onClick={() => nextImagesHandler(limit, image.nextToken)}
              variant='contained'
            >
              Load more
            </Button>
          </ButtonBar>
        )
      }
    </Fragment>
  );
}

ImagesList.propTypes = {
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      clubId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  nextImagesHandler: PropTypes.func.isRequired
};

function mapStateToProps ({image}) {
  return {
    image
  };
}

function mapDispatchToProps (dispatch, {match: {params: {clubId}}}) {
  return {
    getImagesHandler (limit) {
      return dispatch(getImages(clubId, limit));
    },
    nextImagesHandler (limit, next) {
      return dispatch(nextImages(clubId, limit, next));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(ImagesList));
