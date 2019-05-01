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

function ClubsForm ({name, onSubmit, twitterHandle, website}) {
  return (
    <Formik
      initialValues={{
        name,
        twitterHandle,
        website
      }}
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
        </Form>
      )}
    </Formik>
  );
}

ClubsForm.propTypes = {
  name: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  twitterHandle: PropTypes.string,
  website: PropTypes.string
};

ClubsForm.defaultProps = {
  name: '',
  twitterHandle: '',
  website: ''
};

export default ClubsForm;
