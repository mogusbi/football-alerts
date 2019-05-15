import React, {Fragment, memo, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getClubs, nextClubs} from '../../actions/ClubActions';
import DataTable from '../../components/DataTable';
import DataTableCell from '../../components/DataTableCell';
import DataTableRow from '../../components/DataTableRow';
import FormButtonBar from '../../components/FormButtonBar';
import LinkButton from '../../components/LinkButton';

function ClubsList ({club, getClubsHandler, nextClubsHandler}) {
  const limit = 10;

  useEffect(() => {
    getClubsHandler(limit);
  }, [
    getClubsHandler
  ]);

  return (
    <Fragment>
      <FormButtonBar>
        <LinkButton
          color='primary'
          to='/add'
          variant='contained'
        >
          Add new club
        </LinkButton>
      </FormButtonBar>

      <DataTable
        headings={[
          'Name',
          ''
        ]}
        loadMore={club.nextToken}
        loadMoreHandler={() => nextClubsHandler(limit, club.nextToken)}
      >
        {
          club.clubs.map(
            ({id, name}) => (
              <DataTableRow key={id}>
                <DataTableCell>
                  {name}
                </DataTableCell>
                <DataTableCell align='right'>
                  <LinkButton
                    color='primary'
                    size='small'
                    to={`/clubs/${id}/dashboard`}
                    variant='contained'
                  >
                    Select
                  </LinkButton>
                  {' '}
                  <LinkButton
                    color='primary'
                    size='small'
                    to={`/clubs/${id}/edit`}
                    variant='text'
                  >
                    Edit
                  </LinkButton>
                </DataTableCell>
              </DataTableRow>
            )
          )
        }
      </DataTable>
    </Fragment>
  );
}

ClubsList.propTypes = {
  club: PropTypes.shape({
    clubs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    nextToken: PropTypes.string
  }).isRequired,
  getClubsHandler: PropTypes.func.isRequired,
  nextClubsHandler: PropTypes.func.isRequired
};

function mapStateToProps ({club}) {
  return {
    club
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getClubsHandler (limit) {
      return dispatch(getClubs(limit));
    },
    nextClubsHandler (limit, next) {
      return dispatch(nextClubs(limit, next));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(ClubsList));
