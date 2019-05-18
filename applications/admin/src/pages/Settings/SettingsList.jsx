import PropTypes from 'prop-types';
import React, {Fragment, memo, useEffect} from 'react';
import {connect} from 'react-redux';
import {getSettings, nextSettings} from '../../actions/SettingActions';
import DataTable from '../../components/DataTable';
import DataTableCell from '../../components/DataTableCell';
import DataTableRow from '../../components/DataTableRow';
import FormButtonBar from '../../components/FormButtonBar';
import LinkButton from '../../components/LinkButton';

function SettingsList ({getSettingsHandler, match: {params: {type}}, nextSettingsHandler, setting}) {
  const limit = 10;

  useEffect(() => {
    getSettingsHandler(limit);
  }, [
    getSettingsHandler
  ]);

  return (
    <Fragment>
      <FormButtonBar>
        <LinkButton
          color='primary'
          to={`/settings/${type}/add`}
          variant='contained'
        >
          Add
          {' '}
          {type}
          {' '}
          setting
        </LinkButton>
        {' '}
        <LinkButton
          color='secondary'
          to='/settings'
          variant='contained'
        >
          Settings
        </LinkButton>
      </FormButtonBar>

      <DataTable
        headings={[
          'Name',
          ''
        ]}
        loadMore={setting.nextToken}
        loadMoreHandler={() => nextSettingsHandler(limit, setting.nextToken)}
      >
        {
          setting.settings.map(
            ({id, name}) => (
              <DataTableRow key={id}>
                <DataTableCell>
                  {name}
                </DataTableCell>
                <DataTableCell align='right'>
                  <LinkButton
                    color='primary'
                    size='small'
                    to={`/settings/${type}/${id}/edit`}
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

SettingsList.propTypes = {
  getSettingsHandler: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  nextSettingsHandler: PropTypes.func.isRequired,
  setting: PropTypes.shape({
    nextToken: PropTypes.string,
    settings: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }))
  }).isRequired
};

function mapStateToProps ({setting}) {
  return {
    setting
  };
}

function mapDispatchToProps (dispatch, {match: {params: {type}}}) {
  return {
    getSettingsHandler (limit) {
      return dispatch(getSettings(type, limit));
    },
    nextSettingsHandler (limit, next) {
      return dispatch(nextSettings(type, limit, next));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(SettingsList));
