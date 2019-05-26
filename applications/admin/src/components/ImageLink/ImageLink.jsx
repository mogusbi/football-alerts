import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(NavLink)`
  border: 3px solid transparent;
  display: block;
  transition: border-color 150ms cubic-bezier(.4, 0, .2, 1) 0ms;
  
  :hover {
    border-color: #3f51b5;
  }
`;

function ImageLink ({children, to}) {
  return (
    <Link to={to}>
      {children}
    </Link>
  );
}

ImageLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired
};

export default memo(ImageLink);
