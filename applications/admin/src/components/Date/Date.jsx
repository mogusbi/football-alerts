import moment from 'moment';
import PropTypes from 'prop-types';
import React, {memo} from 'react';

function Date ({date, format, ...props}) {
  return (
    <time
      dateTime={date}
      {...props}
    >
      {moment(date).format(format)}
    </time>
  );
}

Date.propTypes = {
  date: PropTypes.string.isRequired,
  format: PropTypes.string
};

Date.defaultProps = {
  format: 'ddd DD MMMM YYYY HH.mm'
};

export default memo(Date);
