import {Connect} from 'aws-amplify-react';
import {graphqlOperation} from 'aws-amplify';
import PropTypes from 'prop-types';
import React, {Fragment, memo, useState} from 'react';
import {connect} from 'react-redux';
import {deleteSetting, updateSetting} from '../../../actions/SettingActions';
import Loader from '../../../components/Loader';
import Confirmation from '../../../components/Confirmation';
import * as queries from '../../../graphql/queries';
import ImagesForm from './ImagesForm';

const type = 'images';

function ImagesEdit ({deleteHandler, match: {params: {id}}, submitHandler}) {
  const [confirmation, setConfirmation] = useState(false);

  function beginDelete () {
    setConfirmation(true);
  }

  function cancelDelete () {
    setConfirmation(false);
  }

  function submit (input) {
    submitHandler(input);
  }

  return (
    <Connect
      query={graphqlOperation(queries.getSetting, {
        id,
        type
      })}
    >
      {
        ({data: {getSetting}, loading}) => loading ? (
          <Loader loading={loading} />
        ) : (
          <Fragment>
            <ImagesForm
              deleteHandler={beginDelete}
              onSubmit={submit}
              setting={{
                name: getSetting.name,
                value: JSON.parse(getSetting.value)
              }}
            />

            <Confirmation
              closeHandler={cancelDelete}
              confirmHandler={deleteHandler}
              message={`Are you sure you want to delete ${getSetting.name}?`}
              open={confirmation}
              title='Delete image size'
            />
          </Fragment>
        )
      }
    </Connect>
  );
}

ImagesEdit.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  submitHandler: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch, {match: {params: {id}}}) {
  return {
    deleteHandler () {
      return dispatch(deleteSetting(id, type));
    },
    submitHandler (input) {
      return dispatch(updateSetting(id, type, input));
    }
  };
}

export default connect(null, mapDispatchToProps)(memo(ImagesEdit));
