import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Dashboard from '@material-ui/icons/Dashboard';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import Image from '@material-ui/icons/Image';
import Inbox from '@material-ui/icons/Inbox';
import RssFeed from '@material-ui/icons/RssFeed';
import Settings from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';
import React, {Fragment, memo} from 'react';
import styled from 'styled-components';
import ListItemLink from '../ListItemLink';

const Wrapper = styled.div`
  width: 250px;
`;

function AppDrawerList ({clubId}) {
  return (
    <Wrapper>
      {
        clubId && (
          <Fragment>
            <List component='nav'>
              <ListItemLink
                icon={<Dashboard />}
                to={`/clubs/${clubId}/dashboard`}
                primary='Dashboard'
              />
              <ListItemLink
                icon={<RssFeed />}
                to={`/clubs/${clubId}/sources`}
                primary='Sources'
              />
              <ListItemLink
                icon={<Inbox />}
                to={`/clubs/${clubId}/articles`}
                primary='Articles'
              />
              <ListItemLink
                icon={<Image />}
                to={`/clubs/${clubId}/images`}
                primary='Images'
              />
            </List>

            <Divider />
          </Fragment>
        )
      }

      <List component='nav'>
        <ListItemLink
          icon={<Settings />}
          to='/settings'
          primary='Settings'
        />
      </List>

      <Divider />

      <List component='nav'>
        <ListItemLink
          icon={<DirectionsRun />}
          to='/'
          primary='Select club'
        />
      </List>
    </Wrapper>
  );
}

AppDrawerList.propTypes = {
  clubId: PropTypes.string
};

AppDrawerList.defaultProps = {
  clubId: null
};

export default memo(AppDrawerList);
