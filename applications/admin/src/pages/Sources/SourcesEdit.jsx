import {Connect} from 'aws-amplify-react';
import {graphqlOperation} from 'aws-amplify';
import PropTypes from 'prop-types';
import React, {Fragment, memo, useState} from 'react';
import {connect} from 'react-redux';
import {deleteSource, updateSource} from '../../actions/SourceActions';
import Loader from '../../components/Loader';
import Confirmation from '../../components/Confirmation';
import * as queries from '../../graphql/queries';
import SourcesForm from './SourcesForm';

function SourcesEdit ({deleteHandler, match: {params: {clubId, id}}, submitHandler}) {
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
      query={graphqlOperation(queries.getSource, {
        clubId,
        id
      })}
    >
      {
        ({data: {getSource}, loading}) => loading ? (
          <Loader loading={loading} />
        ) : (
          <Fragment>
            <SourcesForm
              clubId={clubId}
              deleteHandler={beginDelete}
              onSubmit={submit}
              source={getSource}
            />

            <Confirmation
              closeHandler={cancelDelete}
              confirmHandler={deleteHandler}
              message={`Are you sure you want to delete ${getSource.name}?`}
              open={confirmation}
              title='Delete source'
            />
          </Fragment>
        )
      }
    </Connect>
  );
}

SourcesEdit.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clubId: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  submitHandler: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch, {match: {params: {clubId, id}}}) {
  return {
    deleteHandler () {
      return dispatch(deleteSource(id, clubId));
    },
    submitHandler (input) {
      return dispatch(updateSource(id, clubId, input));
    }
  };
}

export default connect(null, mapDispatchToProps)(memo(SourcesEdit));
