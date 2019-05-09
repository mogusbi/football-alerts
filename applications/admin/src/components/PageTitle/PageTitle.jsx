import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {memo} from 'react';

function PageTitle ({title}) {
  return (
    <Typography
      gutterBottom
      component='h2'
      variant='h4'
    >
      {title}
    </Typography>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default memo(PageTitle);
