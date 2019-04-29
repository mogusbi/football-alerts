import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Dashboard from '@material-ui/icons/Dashboard';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import React, {memo} from 'react';
import styled from 'styled-components';
import ListItemLink from '../ListItemLink';

const Wrapper = styled.div`
  width: 250px;
`;

function AppDrawerList () {
  return (
    <Wrapper>
      <List>
        <ListItemLink
          icon={<Dashboard />}
          to='/'
          primary='Dashboard'
        />
      </List>

      <Divider />

      <List>
        <ListItemLink
          icon={<DirectionsRun />}
          to='/clubs'
          primary='Clubs'
        />
      </List>
    </Wrapper>
  );
}

export default memo(AppDrawerList);
