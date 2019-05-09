import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

function LinkButton ({to, ...props}) {
  return (
    <Button
      component={Link}
      to={to}
      {...props}
    />
  );
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired
};

export default memo(LinkButton);
