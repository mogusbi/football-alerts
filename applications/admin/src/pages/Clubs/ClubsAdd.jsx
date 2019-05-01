import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {createClub} from '../../actions/ClubActions';
import ClubsForm from './ClubsForm';

function ClubsAdd ({submitHandler}) {
  return (
    <ClubsForm onSubmit={submitHandler} />
  );
}

ClubsAdd.propTypes = {
  submitHandler: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return {
    submitHandler (input) {
      return dispatch(createClub(input));
    }
  };
}

export default connect(null, mapDispatchToProps)(ClubsAdd);
