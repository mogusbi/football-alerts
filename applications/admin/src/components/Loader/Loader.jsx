import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #3f51b5;
  height: 4px;
`;

function Loader ({loading}) {
  return (
    <Wrapper>
      {loading && (
        <LinearProgress color='secondary' />
      )}
    </Wrapper>
  );
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default memo(Loader);
