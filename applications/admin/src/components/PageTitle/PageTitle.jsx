import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import styled from 'styled-components';

const Header = styled.header``;

function PageTitle ({title}) {
  return (
    <Header>
      <Typography
        gutterBottom
        component='h2'
        variant='h4'
      >
        {title}
      </Typography>
    </Header>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default memo(PageTitle);
