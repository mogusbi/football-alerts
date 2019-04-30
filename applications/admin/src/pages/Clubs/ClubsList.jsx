import React, {Fragment, memo} from 'react';
import LinkButton from '../../components/LinkButton';

function ClubsList () {
  return (
    <Fragment>
      <LinkButton to='/clubs/add'>
        Add new club
      </LinkButton>
    </Fragment>
  );
}

export default memo(ClubsList);
