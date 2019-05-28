import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {FormikSelectField, FormikTextField} from 'formik-material-fields';
import PropTypes from 'prop-types';
import React, {Fragment, memo} from 'react';
import * as Yup from 'yup';
import Editor from '../../components/Editor';
import Form from '../../components/Form';
import FormButtonBar from '../../components/FormButtonBar';

const schema = Yup
  .object()
  .shape({
    description: Yup
      .string()
      .required('Description is required'),
    imageId: Yup
      .string()
      .required('Image ID is required'),
    link: Yup
      .string()
      .url('Invalid URL')
      .required('Link is required'),
    status: Yup
      .string()
      .required('Status is required'),
    title: Yup
      .string()
      .required('Title is required')
  });

function ArticlesForm ({article, clubId, deleteHandler, onSubmit}) {
  return (
    <Fragment>
      <Form
        cancelLink={`/clubs/${clubId}/articles`}
        initialValues={article}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        <Grid
          container
          spacing={24}
        >
          <Grid
            item
            xs={12}
          >
            <FormikTextField
              fullWidth
              label='Title'
              margin='normal'
              name='title'
            />
          </Grid>

          <Grid
            item
            xs={12}
          >
            <Editor name='description' />
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
          >
            <FormikTextField
              fullWidth
              label='Link'
              margin='normal'
              name='link'
            />
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
          >
            <FormikSelectField
              fullWidth
              label='Status'
              margin='normal'
              name='status'
              options={[
                {
                  label: 'Pending',
                  value: 'PENDING'
                },
                {
                  label: 'Published',
                  value: 'PUBLISHED'
                }
              ]}
            />
          </Grid>
        </Grid>
      </Form>
      {
        deleteHandler && (
          <FormButtonBar>
            <Grid container>
              <Grid
                item
                xs={12}
              >
                <Button
                  color='secondary'
                  onClick={deleteHandler}
                  variant='contained'
                >
                  Delete article
                </Button>
              </Grid>
            </Grid>
          </FormButtonBar>
        )
      }
    </Fragment>
  );
}

ArticlesForm.propTypes = {
  article: PropTypes.shape({
    description: PropTypes.string,
    imageId: PropTypes.string,
    link: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string
  }),
  clubId: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
};

ArticlesForm.defaultProps = {
  article: {
    description: '',
    imageId: '',
    link: '',
    status: '',
    title: ''
  },
  deleteHandler: null
};

export default memo(ArticlesForm);
