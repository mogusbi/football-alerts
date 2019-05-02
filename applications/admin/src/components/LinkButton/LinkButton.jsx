import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

function LinkButton ({children, color, size, to, variant}) {
  return (
    <Button
      color={color}
      component={Link}
      size={size}
      to={to}
      variant={variant}
    >
      {children}
    </Button>
  );
}

LinkButton.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  to: PropTypes.string.isRequired,
  variant: PropTypes.string
};

LinkButton.defaultProps = {
  color: 'primary',
  size: 'medium',
  variant: 'contained'
};

export default memo(LinkButton);
