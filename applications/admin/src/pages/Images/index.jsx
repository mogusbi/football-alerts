import {S3Image} from 'aws-amplify-react';
import PropTypes from 'prop-types';
import React, {Fragment, memo, useEffect} from 'react';
import {connect} from 'react-redux';
import {getImages, nextImages} from '../../actions/ImageActions';
import PageTitle from '../../components/PageTitle';

function Index ({getImagesHandler, nextImagesHandler}) {
  const limit = 10;

  useEffect(() => {
    getImagesHandler(limit);
  }, [
    getImagesHandler
  ]);

  return (
    <Fragment>
      <PageTitle title='Images' />

      <S3Image imgKey='media/img/311756ea-1271-40e5-b845-5549940bff7c/main.jpg' />

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
