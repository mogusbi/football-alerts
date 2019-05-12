import {Formik} from 'formik';
import {FormikTextField} from 'formik-material-fields';
import {mount} from 'enzyme';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import * as Yup from 'yup';
import Form from '../Form';
import LinkButton from '../../LinkButton';

describe('Form', () => {
  let initialValues;
  let onSubmit;
  let validationSchema;
  let wrapper;

  beforeEach(() => {
    initialValues= {
      name: 'Test'
    };
    onSubmit = jest.fn();
    validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required')
    });
  });

  describe('with cancel link', () => {
    beforeEach(() => {
      wrapper = mount(
        <MemoryRouter>
          <Form
            cancelLink='/back'
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <FormikTextField
              fullWidth
              label='Name'
              margin='normal'
              name='name'
            />
          </Form>
        </MemoryRouter>
      );
    });

    it('should render component', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have the correct onSubmit prop', () => {
      const form = wrapper.find(Formik);

      expect(form.prop('onSubmit')).toEqual(onSubmit);
    });

    it('should enable save button if form is valid', () => {
      const nameField = wrapper.find('input[name="name"]');

      nameField.simulate('change', {
        target: {
          name: 'name',
          value: 'Updated'
        }
      });

      const saveButton = wrapper.find('button[type="submit"]');

      expect(saveButton.prop('disabled')).toEqual(false);
    });

    it('should disable save button if form has not been updated', () => {
      const saveButton = wrapper.find('button[type="submit"]');

      expect(saveButton.prop('disabled')).toEqual(true);
    });

    it('should display a link button navigating to the right place', () => {
      const cancelLink = wrapper.find(LinkButton);

      expect(cancelLink.prop('to')).toEqual('/back');
    });
  });

  describe('without cancel link', () => {
    beforeEach(() => {
      wrapper = mount(
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <FormikTextField
            fullWidth
            label='Name'
            margin='normal'
            name='name'
          />
        </Form>
      );
    });

    it('should render component', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
