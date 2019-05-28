import {graphqlOperation} from 'aws-amplify';
import {Connect} from 'aws-amplify-react';
import PropTypes from 'prop-types';
import React, {Fragment, memo, useState} from 'react';
import {connect} from 'react-redux';
import {deleteArticle, updateArticle} from '../../actions/ArticleActions';
import Confirmation from '../../components/Confirmation';
import Loader from '../../components/Loader';
import * as queries from '../../graphql/queries';
import ArticlesForm from './ArticlesForm';

function ArticlesEdit ({deleteHandler, match: {params: {id, clubId}}, submitHandler}) {
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
      query={graphqlOperation(queries.getArticle, {
        clubId,
        id
      })}
    >
      {
        ({data: {getArticle}, loading}) => loading ? (
          <Loader loading={loading} />
        ) : (
          <Fragment>
            <ArticlesForm
              article={getArticle}
              clubId={clubId}
              deleteHandler={beginDelete}
              onSubmit={submit}
            />

            <Confirmation
              closeHandler={cancelDelete}
              confirmHandler={deleteHandler}
              message={`Are you sure you want to delete ${getArticle.title}?`}
              open={confirmation}
              title='Delete article'
            />
          </Fragment>
        )
      }
    </Connect>
  );
}

ArticlesEdit.propTypes = {
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
      return dispatch(deleteArticle(id, clubId));
    },
    submitHandler (input) {
      return dispatch(updateArticle(id, clubId, input));
    }
  }
}

export default connect(null, mapDispatchToProps)(memo(ArticlesEdit));
