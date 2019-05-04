import {Connect} from 'aws-amplify-react';
import {graphqlOperation} from 'aws-amplify';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {connect} from 'react-redux';
import {deleteClub, updateClub} from '../../actions/ClubActions';
import Loader from '../../components/Loader';
import {getClub} from '../../graphql/queries';
import ClubsForm from './ClubsForm';

function ClubsView ({deleteHandler, match: {params: {id}}, submitHandler}) {


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
            <ClubsForm
              club={getClub}
              deleteHandler={() => deleteHandler(id)}
              onSubmit={(input) => submitHandler(id, input)}
            />
          );
        }
      }
    </Connect>
  );
}

ClubsView.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  submitHandler: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return {
    deleteHandler (id) {
      return dispatch(deleteClub(id));
    },
    submitHandler (id, input) {
      return dispatch(updateClub(id, input));
    }
  };
}

export default connect(null, mapDispatchToProps)(memo(ClubsView));
