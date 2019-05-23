import PropTypes from 'prop-types';
import React, {Fragment, memo, useEffect} from 'react';
import {connect} from 'react-redux';
import {getImages, nextImages} from '../../actions/ImageActions';
import Image from '../../components/Image';
import PageTitle from '../../components/PageTitle';

function Index ({getImagesHandler, image, nextImagesHandler}) {
  const limit = 10;

  useEffect(() => {
    getImagesHandler(limit);
  }, [
    getImagesHandler
  ]);

  return (
    <Fragment>
      <PageTitle title='Images' />

      {
        image.images.map((image) => (
          <Image
            image={image}
            key={image.id}
            size='thumbnail'
          />
        ))
      }

      <button type='button' onClick={() => nextImagesHandler('')}>Load more</button>
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
