import ApplicationBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, {memo, useState} from 'react';
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

function AppBar ({handleDrawer, handleSignOut}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleClose () {
    setAnchorEl(null);
  }

  function handleMenu (e) {
    setAnchorEl(e.currentTarget);
  }

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
                  onClick={handleMenu}
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
                  onClose={handleClose}
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
  handleDrawer: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired
};

export default memo(AppBar);
