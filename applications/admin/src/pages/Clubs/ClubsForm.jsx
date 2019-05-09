import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Form, Formik} from 'formik';
import {FormikTextField} from 'formik-material-fields';
import PropTypes from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import FormButtonBar from '../../components/FormButtonBar';
import LinkButton from '../../components/LinkButton';

const schema = Yup.object().shape({
  name: Yup.string().required('Club name is required'),
  twitterHandle: Yup.string().matches(/^[A-Za-z0-9_]{1,15}$/, 'Invalid Twitter handle'),
  website: Yup.string().url('Invalid URL')
});

function ClubsForm ({club, deleteHandler, onSubmit}) {
  return (
    <Formik
      initialValues={club}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({isValid}) => (
        <Form autoComplete='off'>
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

          <FormButtonBar>
            <Grid
              container
              justify='space-between'
            >
              <Grid item>
                <LinkButton
                  color='secondary'
                  to='/clubs'
                  variant='contained'
                >
                  Cancel
                </LinkButton>
              </Grid>

              <Grid item>
                <Button
                  color='primary'
                  disabled={!isValid}
                  type='submit'
                  variant='contained'
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </FormButtonBar>

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
        </Form>
      )}
    </Formik>
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
