import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Form as FormikForm, Formik} from 'formik';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import styled from 'styled-components';
import LinkButton from '../LinkButton';
import FormButtonBar from '../FormButtonBar';

const Wrapper = styled(Paper)`
  padding: 24px;
`;

function Form ({cancelLink, children, initialValues, onSubmit, validationSchema}) {
  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {
          ({isValid}) => (
            <FormikForm autoComplete='off'>
              {children}

              <FormButtonBar>
                <Grid
                  container
                  justify='space-between'
                >
                  <Grid item>
                    {
                      cancelLink && (
                        <LinkButton
                          color='secondary'
                          to={cancelLink}
                          variant='contained'
                        >
                          Cancel
                        </LinkButton>
                      )
                    }
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
            </FormikForm>
          )
        }
      </Formik>
    </Wrapper>
  );
}

Form.propTypes = {
  cancelLink: PropTypes.string,
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationSchema: PropTypes.shape({}).isRequired
};

Form.defaultProps = {
  cancelLink: null
};

export default memo(Form);
