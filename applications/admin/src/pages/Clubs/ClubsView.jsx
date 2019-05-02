import {Connect} from 'aws-amplify-react';
import {graphqlOperation} from 'aws-amplify';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {connect} from 'react-redux';
import {updateClub} from '../../actions/ClubActions';
import ClubsForm from './ClubsForm';

function ClubsView ({match: {params: {id}}, submitHandler}) {
  const query = `query GetClub($id: ID!) {
    getClub(id: $id) {
      id
      name
      twitterHandle
      website
    }
  }`;
  return (
    <Connect
      query={graphqlOperation(query, {
        id
      })}
    >
      {
        ({data: {getClub}}) => getClub && (
          <ClubsForm
            name={getClub.name}
            onSubmit={(input) => submitHandler(id, input)}
            twitterHandle={getClub.twitterHandle}
            website={getClub.website}
          />
        )
      }
    </Connect>
  );
}

ClubsView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  submitHandler: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return {
    submitHandler (id, input) {
      return dispatch(updateClub(id, input));
    }
  };
}

export default connect(null, mapDispatchToProps)(memo(ClubsView));
