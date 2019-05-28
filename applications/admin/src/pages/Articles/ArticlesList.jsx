import PropTypes from 'prop-types';
import React, {memo, useEffect} from 'react';
import {connect} from 'react-redux';
import {getArticles, nextArticles} from '../../actions/ArticleActions';
import DataTable from '../../components/DataTable';
import DataTableCell from '../../components/DataTableCell';
import DataTableRow from '../../components/DataTableRow';
import Date from '../../components/Date';
import LinkButton from '../../components/LinkButton';

function ArticlesList ({article, getArticlesHandler, match: {params: {clubId}}, nextArticlesHandler}) {
  const limit = 10;

  useEffect(() => {
    getArticlesHandler(limit);
  }, [
    getArticlesHandler
  ]);

  return (
    <DataTable
      headings={[
        'Title',
        'Status',
        'Publish date',
        ''
      ]}
      loadMore={article.nextToken}
      loadMoreHandler={() => nextArticlesHandler(limit, article.nextToken)}
    >
      {
        article.articles.map(
          ({id, publishDate, status, title}) => (
            <DataTableRow key={id}>
              <DataTableCell>
                {title}
              </DataTableCell>
              <DataTableCell>
                {status}
              </DataTableCell>
              <DataTableCell>
                <Date date={publishDate} />
              </DataTableCell>
              <DataTableCell align='right'>
                <LinkButton
                  color='primary'
                  size='small'
                  to={`/clubs/${clubId}/articles/${id}/edit`}
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
  );
}

ArticlesList.propTypes = {
  article: PropTypes.shape({
    articles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      publishDate: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })),
    nextToken: PropTypes.string
  }).isRequired,
  getArticlesHandler: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clubId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  nextArticlesHandler: PropTypes.func.isRequired
};

function mapStateToProps ({article}) {
  return {
    article
  };
}

function mapDispatchToProps (dispatch, {match: {params: {clubId}}}) {
  return {
    getArticlesHandler (limit) {
      return dispatch(getArticles(clubId, limit));
    },
    nextArticlesHandler (limit, next) {
      return dispatch(nextArticles(clubId, limit, next));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(ArticlesList));
