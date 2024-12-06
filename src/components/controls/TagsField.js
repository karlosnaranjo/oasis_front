import React from 'react';
import PropTypes from 'prop-types';
import TagInput from 'components/TagInput';

/**
 * This component renders a text field representation
 * for advanced form.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const TagsField = ({ field, form, proxyonchange, ...otherProps }) => {
  const { onChange } = field;
  field.onChange = (event) => {
    if (onChange) {
      onChange(event);
    }
    if (proxyonchange) proxyonchange(event);
  };
  if (!Array.isArray(field.value)) {
    field.value = [];
  }
  const { errors, touched } = form;
  const hasError = Boolean((errors[field.name] && touched[field.name]) || errors[field.name]);
  // remove unnecesary events
  delete otherProps.proxyonblur;
  return <TagInput error={hasError} helperText={hasError ? errors[field.name] : null} {...field} {...otherProps} />;
};

TagsField.propTypes = {
  field: PropTypes.oneOfType([PropTypes.any]),
  form: PropTypes.oneOfType([PropTypes.any]),
  proxyonchange: PropTypes.func
};

export default TagsField;
