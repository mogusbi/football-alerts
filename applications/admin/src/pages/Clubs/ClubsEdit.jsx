import {Connect} from 'aws-amplify-react';
import {graphqlOperation} from 'aws-amplify';
import PropTypes from 'prop-types';
import React, {Fragment, memo, useState} from 'react';
import {connect} from 'react-redux';
import {deleteClub, updateClub} from '../../actions/ClubActions';
import Loader from '../../components/Loader';
import Confirmation from '../../components/Confirmation';
import {getClub} from '../../graphql/queries';
import ClubsForm from './ClubsForm';

function ClubsEdit ({deleteHandler, match: {params: {id}}, submitHandler}) {
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
      query={graphqlOperation(getClub, {
        id
      })}
    >
      {
        ({data: {getClub}, loading}) => {
          if (loading) {
            return (
              <Loader loading={loading} />
            );
          }

          return (
            <Fragment>
              <ClubsForm
                club={getClub}
                deleteHandler={beginDelete}
                onSubmit={submit}
              />

              <Confirmation
                closeHandler={cancelDelete}
                confirmHandler={deleteHandler}
                message={`Are you sure you want to delete ${getClub.name}?`}
                open={confirmation}
                title='Delete club'
              />
            </Fragment>
          );
        }
      }
    </Connect>
  );
}

ClubsEdit.propTypes = {
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
      return dispatch(deleteClub(id));
    },
    submitHandler (input) {
      return dispatch(updateClub(id, input));
    }
  };
}

export default connect(null, mapDispatchToProps)(memo(ClubsEdit));
