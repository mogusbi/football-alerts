import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

function LinkButton ({children, color, to, variant}) {
  return (
    <Button
      color={color}
      component={Link}
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
  to: PropTypes.string.isRequired,
  variant: PropTypes.string
};

LinkButton.defaultProps = {
  color: 'primary',
  variant: 'contained'
};

export default memo(LinkButton);
