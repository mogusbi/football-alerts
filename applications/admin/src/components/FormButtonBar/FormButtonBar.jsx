import PropTypes from 'prop-types';
import React, {memo} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 24px;
`;

function FormButtonBar ({children}) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

FormButtonBar.propTypes = {
  children: PropTypes.node.isRequired
};

export default memo(FormButtonBar);
