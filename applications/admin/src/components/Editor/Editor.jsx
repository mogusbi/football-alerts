import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Field} from 'formik';
import PropTypes from 'prop-types';
import React, {memo} from 'react';

function RichTextEditor ({config, field: {name, value}, form: {setFieldValue}}) {
  function onChange (event, editor) {
    setFieldValue(name, editor.getData())
  }

  return (
    <CKEditor
      config={config}
      data={value}
      editor={ClassicEditor}
      onChange={onChange}
    />
  );
}

RichTextEditor.propTypes = {
  config: PropTypes.shape({
    toolbar: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired
  }).isRequired
};

function Editor (props) {
  return (
    <Field
      component={RichTextEditor}
      {...props}
    />
  );
}

Editor.propTypes = {
  config: PropTypes.shape({
    toolbar: PropTypes.arrayOf(PropTypes.string)
  }),
  name: PropTypes.string.isRequired
};

Editor.defaultProps = {
  config: {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote'
    ]
  }
};

export default memo(Editor);
