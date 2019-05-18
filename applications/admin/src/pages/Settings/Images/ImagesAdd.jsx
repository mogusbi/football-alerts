import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {connect} from 'react-redux';
import ImagesForm from './ImagesForm';
import {createSetting} from '../../../actions/SettingActions';

function ImagesAdd ({submitHandler}) {
  return (
    <ImagesForm onSubmit={submitHandler} />
  );
}

ImagesAdd.propTypes = {
  submitHandler: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return {
    submitHandler (input) {
      return dispatch(createSetting('images', input));
    }
  };
}

export default connect(null, mapDispatchToProps)(memo(ImagesAdd));
