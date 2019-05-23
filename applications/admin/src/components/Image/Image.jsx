import {S3Image} from 'aws-amplify-react';
import PropTypes from 'prop-types';
import React, {memo} from 'react';

function Image ({image: {images}, size, ...props}) {
  const {path} = images.find(({name}) => name === size);
  const key = path.replace('public/', '');

  return (
    <S3Image
      {...props}
      imgKey={key}
    />
  );
}

Image.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    }).isRequired).isRequired
  }).isRequired,
  size: PropTypes.string.isRequired
};

export default memo(Image);
