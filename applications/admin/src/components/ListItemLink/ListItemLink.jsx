import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

function ListItemLink ({icon, primary, to}) {
  function renderLink (itemProps) {
    return (
      <Link to={to} {...itemProps} />
    );
  }

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.node.isRequired,
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default memo(ListItemLink);
