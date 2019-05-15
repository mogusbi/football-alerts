import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Dashboard from '@material-ui/icons/Dashboard';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
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
            <List>
              <ListItemLink
                icon={<Dashboard />}
                to={`/clubs/${clubId}/dashboard`}
                primary='Dashboard'
              />
            </List>

            <Divider />
          </Fragment>
        )
      }

      <List>
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
