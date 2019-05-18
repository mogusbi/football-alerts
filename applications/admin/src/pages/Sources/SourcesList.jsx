import PropTypes from 'prop-types';
import React, {Fragment, memo, useEffect} from 'react';
import {connect} from 'react-redux';
import {getSources, nextSources} from '../../actions/SourceActions';
import DataTable from '../../components/DataTable';
import DataTableCell from '../../components/DataTableCell';
import DataTableRow from '../../components/DataTableRow';
import FormButtonBar from '../../components/FormButtonBar';
import LinkButton from '../../components/LinkButton';

function SourcesList ({getSourcesHandler, match: {params: {clubId}}, nextSourcesHandler, source}) {
  const limit = 10;

  useEffect(() => {
    getSourcesHandler(limit);
  }, [
    getSourcesHandler
  ]);

  return (
    <Fragment>
      <FormButtonBar>
        <LinkButton
          color='primary'
          to={`/clubs/${clubId}/sources/add`}
          variant='contained'
        >
          Add new source
        </LinkButton>
      </FormButtonBar>

      <DataTable
        headings={[
          'Name',
          ''
        ]}
        loadMore={source.nextToken}
        loadMoreHandler={() => nextSourcesHandler(limit, source.nextToken)}
      >
        {
          source.sources.map(
            ({id, name}) => (
              <DataTableRow key={id}>
                <DataTableCell>
                  {name}
                </DataTableCell>
                <DataTableCell align='right'>
                  <LinkButton
                    color='primary'
                    size='small'
                    to={`/clubs/${clubId}/sources/${id}/edit`}
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

SourcesList.propTypes = {
  getSourcesHandler: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clubId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  nextSourcesHandler: PropTypes.func.isRequired,
  source: PropTypes.shape({
    nextToken: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }))
  }).isRequired
};

function mapStateToProps ({source}) {
  return {
    source
  };
}

function mapDispatchToProps (dispatch, {match: {params: {clubId}}}) {
  return {
    getSourcesHandler (limit) {
      return dispatch(getSources(clubId, limit));
    },
    nextSourcesHandler (limit, next) {
      return dispatch(nextSources(clubId, limit, next));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(SourcesList));
