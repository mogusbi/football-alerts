import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React, {Fragment, memo, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getArticles, nextArticles} from '../../actions/ArticleActions';
import DataTable from '../../components/DataTable';
import DataTableCell from '../../components/DataTableCell';
import DataTableRow from '../../components/DataTableRow';
import Date from '../../components/Date';
import LinkButton from '../../components/LinkButton';

function ArticlesList ({article, getArticlesHandler, match: {params: {clubId}}, nextArticlesHandler}) {
  const limit = 10;
  const [status, setStatus] = useState('PENDING');

  useEffect(() => {
    getArticlesHandler(status, limit);
  }, [
    getArticlesHandler,
    status
  ]);

  function updateStatus (event) {
    setStatus(event.target.value);
  }

  return (
    <Fragment>
      <FormControl>
        <Select
          onChange={updateStatus}
          value={status}
        >
          <MenuItem value='PENDING'>
            Pending
          </MenuItem>
          <MenuItem value='PUBLISHED'>
            Published
          </MenuItem>
          <MenuItem value='DELETED'>
            Deleted
          </MenuItem>
        </Select>
      </FormControl>


      <DataTable
        headings={[
          'Title',
          'Status',
          'Publish date',
          ''
        ]}
        loadMore={article.nextToken}
        loadMoreHandler={() => nextArticlesHandler(status, limit, article.nextToken)}
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
    </Fragment>
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
    getArticlesHandler (status, limit) {
      return dispatch(getArticles(clubId, status, limit));
    },
    nextArticlesHandler (status, limit, next) {
      return dispatch(nextArticles(clubId, status, limit, next));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(ArticlesList));
