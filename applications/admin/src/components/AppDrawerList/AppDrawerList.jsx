import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Dashboard from '@material-ui/icons/Dashboard';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import Inbox from '@material-ui/icons/Inbox';
import RssFeed from '@material-ui/icons/RssFeed';
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
            </List>

            <Divider />
          </Fragment>
        )
      }

      <List component='nav'>
        <ListItemLink
          icon={<DirectionsRun />}
          to='/'
          primary='Clubs'
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
