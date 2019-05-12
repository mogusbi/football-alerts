import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {FormikTextField} from 'formik-material-fields';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import * as Yup from 'yup';
import Form from '../../components/Form';
import FormButtonBar from '../../components/FormButtonBar';

const schema = Yup.object().shape({
  name: Yup.string().required('Club name is required'),
  twitterHandle: Yup.string().matches(/^[A-Za-z0-9_]{1,15}$/, 'Invalid Twitter handle'),
  website: Yup.string().url('Invalid URL')
});

function ClubsForm ({club, deleteHandler, onSubmit}) {
  return (
    <Fragment>
      <Form
        cancelLink='/clubs'
        initialValues={club}
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
            sm={6}
            xs={12}
          >
            <FormikTextField
              fullWidth
              label='Website'
              margin='normal'
              name='website'
            />
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
          >
            <FormikTextField
              fullWidth
              label='Twitter handle'
              margin='normal'
              name='twitterHandle'
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
                  {club.name}
                </Button>
              </Grid>
            </Grid>
          </FormButtonBar>
        )
      }
    </Fragment>
  );
}

ClubsForm.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    twitterHandle: PropTypes.string,
    website: PropTypes.string
  }),
  deleteHandler: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
};

ClubsForm.defaultProps = {
  club: {
    name: '',
    twitterHandle: '',
    website: ''
  },
  deleteHandler: null
};

export default ClubsForm;
