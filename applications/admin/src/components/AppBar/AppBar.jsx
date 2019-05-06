import ApplicationBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import styled from 'styled-components';

const Bar = styled(ApplicationBar)`
  user-select: none;
`;

const MenuButton = styled(IconButton)`
  margin-right: 16px;
`;

const Root = styled.div`
  flex-grow: 1;
`;

const Title = styled(Typography)`
  flex-grow: 1;
`;

function AppBar ({anchorEl, handleAccountMenuClose, handleAccountMenuOpen, handleDrawer, handleSignOut}) {
  const open = Boolean(anchorEl);

  return (
    <Root>
      <Bar position='static'>
        <Toolbar>
          {
            handleDrawer && (
              <MenuButton
                aria-label='Menu'
                color='inherit'
                edge='start'
                onClick={handleDrawer}
              >
                <MenuIcon />
              </MenuButton>
            )
          }

          <Title
            color='inherit'
            component='h1'
            variant='h6'
          >
            Football Alerts
          </Title>

          {
            handleSignOut && (
              <div>
                <IconButton
                  aria-haspopup='true'
                  aria-label='My account'
                  aria-owns={open ? 'menu-appbar' : undefined}
                  color='inherit'
                  onClick={handleAccountMenuOpen}
                >
                  <AccountCircle />
                </IconButton>

                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                  }}
                  onClose={handleAccountMenuClose}
                  open={open}
                  transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                  }}
                >
                  <MenuItem
                    id='sign-out-button'
                    onClick={handleSignOut}
                  >
                    Sign out
                  </MenuItem>
                </Menu>
              </div>
            )
          }
        </Toolbar>
      </Bar>
    </Root>
  );
}

AppBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  anchorEl: PropTypes.object,
  handleAccountMenuClose: PropTypes.func.isRequired,
  handleAccountMenuOpen: PropTypes.func.isRequired,
  handleDrawer: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired
};

AppBar.defaultProps = {
  anchorEl: null
};

export default memo(AppBar);
