import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {createSource} from '../../actions/SourceActions';
import SourcesForm from './SourcesForm';

function SourcesAdd ({match: {params: {clubId}}, submitHandler}) {
  return (
    <SourcesForm
      clubId={clubId}
      onSubmit={submitHandler}
    />
  );
}

SourcesAdd.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      clubId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  submitHandler: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch, {match: {params: {clubId}}}) {
  return {
    submitHandler (input) {
      return dispatch(createSource(clubId, input));
    }
  };
}

export default connect(null, mapDispatchToProps)(SourcesAdd);
