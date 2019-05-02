import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
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
