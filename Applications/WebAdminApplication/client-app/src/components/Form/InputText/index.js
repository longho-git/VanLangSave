import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import classnames from 'classnames';

function Select({
  placeholder,
  label,
  icon,
  register,
  name,
  rules,
  errors,
  onChange,
  value,
  disabled,
  rows = 0,
  type = 'text',
  textarea = false,
  ...rest
}) {
  return (
    <FormGroup
      className={classnames({
        'has-danger': errors[name],
      })}
    >
      <label className="form-control-label" htmlFor="validationServer04">
        {label}
      </label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          {...register(name, rules)}
          {...rest}
          type={type}
          rows={rows}
          disabled={disabled}
          defaultValue={value}
          aria-invalid={errors[name] ? true : false}
          onChange={onChange}
          className={classnames('form-control', {
            'is-invalid': errors[name],
          })}
        />
      ) : (
        <input
          placeholder={placeholder}
          {...register(name, rules)}
          {...rest}
          type={type}
          disabled={disabled}
          defaultValue={value}
          aria-invalid={errors[name] ? true : false}
          onChange={onChange}
          className={classnames('form-control', {
            'is-invalid': errors[name],
          })}
        />
      )}

      {errors[name] && (
        <div className="invalid-feedback">{errors[name].message}</div>
      )}
    </FormGroup>
  );
}

Select.propTypes = {
  setfocused: PropTypes.any,
  focused: PropTypes.func,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.element,
};

export default Select;
