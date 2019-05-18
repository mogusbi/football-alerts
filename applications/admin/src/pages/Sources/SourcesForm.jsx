import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {FormikTextField} from 'formik-material-fields';
import PropTypes from 'prop-types';
import React, {Fragment, memo} from 'react';
import * as Yup from 'yup';
import Form from '../../components/Form';
import FormButtonBar from '../../components/FormButtonBar';

const schema = Yup.object().shape({
  description: Yup
    .string()
    .required('Description is required'),
  feed: Yup
    .string()
    .url('Invalid URL')
    .required('RSS feed URL is required'),
  image: Yup
    .object()
    .shape({
      property: Yup
        .string()
        .required('Image property is required'),
      value: Yup
        .string()
        .required('Image value is required')
    }),
  link: Yup
    .string()
    .required('Link is required'),
  name: Yup
    .string()
    .required('Name is required'),
  publishDate: Yup
    .string()
    .required('Publish date is required'),
  title: Yup
    .string()
    .required('Title is required')
});

function SourcesForm ({clubId, deleteHandler, onSubmit, source}) {
  return (
    <Fragment>
      <Form
        cancelLink={`/clubs/${clubId}/sources`}
        initialValues={source}
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
              label='Name'
              margin='normal'
              name='name'
            />
          </Grid>

          <Grid
            item
            xs={12}
          >
            <FormikTextField
              fullWidth
              label='Feed URL'
              margin='normal'
              name='feed'
            />
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
            <FormikTextField
              fullWidth
              label='Title'
              margin='normal'
              name='title'
            />
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
          >
            <FormikTextField
              fullWidth
              label='Description'
              margin='normal'
              name='description'
            />
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
          >
            <FormikTextField
              fullWidth
              label='Publish date'
              margin='normal'
              name='publishDate'
            />
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
          >
            <FormikTextField
              fullWidth
              label='Image property'
              margin='normal'
              name='image.property'
            />
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
          >
            <FormikTextField
              fullWidth
              label='Image value'
              margin='normal'
              name='image.value'
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
                  Delete
                  {' '}
                  {source.name}
                </Button>
              </Grid>
            </Grid>
          </FormButtonBar>
        )
      }
    </Fragment>
  );
}

SourcesForm.propTypes = {
  clubId: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  source: PropTypes.shape({
    description: '',
    feed: PropTypes.string,
    image: PropTypes.shape({
      property: PropTypes.string,
      value: PropTypes.string
    }),
    link: PropTypes.string,
    name: PropTypes.string,
    publishDate: PropTypes.string,
    title: PropTypes.string
  })
};

SourcesForm.defaultProps = {
  deleteHandler: null,
  source: {
    description: '',
    feed: '',
    image: {
      property: '',
      value: ''
    },
    link: '',
    name: '',
    publishDate: '',
    title: ''
  }
};

export default memo(SourcesForm);
