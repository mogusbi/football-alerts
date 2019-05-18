import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {FormikTextField} from 'formik-material-fields';
import PropTypes from 'prop-types';
import React, {Fragment, memo} from 'react';
import * as Yup from 'yup';
import Form from '../../../components/Form';
import FormButtonBar from '../../../components/FormButtonBar';

const schema = Yup
  .object()
  .shape({
    name: Yup
      .string()
      .required('Name is required'),
    value: Yup
      .object()
      .shape({
        height: Yup
          .number()
          .required('Height is required'),
        width: Yup
          .number()
          .required('Width is required')
      })
  });

function ImagesForm ({deleteHandler, onSubmit, setting}) {
  return (
    <Fragment>
      <Form
        cancelLink='/settings/images'
        initialValues={setting}
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
              label='Width'
              margin='normal'
              name='value.width'
            />
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
          >
            <FormikTextField
              fullWidth
              label='Height'
              margin='normal'
              name='value.height'
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
                  {setting.name}
                </Button>
              </Grid>
            </Grid>
          </FormButtonBar>
        )
      }
    </Fragment>
  );
}

ImagesForm.propTypes = {
  deleteHandler: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  setting: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.shape({
      height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]),
      width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ])
    })
  })
};

ImagesForm.defaultProps = {
  deleteHandler: null,
  setting: {
    name: '',
    value: {
      height: '',
      width: ''
    }
  }
};

export default memo(ImagesForm);
