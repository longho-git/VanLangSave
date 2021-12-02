import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup } from 'reactstrap';
import classnames from 'classnames';

function InputCustom({
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
  col = 12,
  icons,
  required,
  type = 'text',
  textarea = false,
  ...rest
}) {
  const [error, setError] = useState(errors[name]);
  const onChangeHandle = () => {
    onChange && onChange();
    setError(null);
  };
  return (
    <Col className="align-self-center" md={col}>
      <FormGroup
        className={classnames({
          'has-danger': error,
        })}
      >
        {label ? (
          <label className="form-control-label" htmlFor="validationServer04">
            {label}
            {required ? <span className="text-danger">*</span> : ''}
          </label>
        ) : (
          <div class="input-group-prepend">
            <span class="input-group-text">{icons}</span>
          </div>
        )}

        {textarea ? (
          <textarea
            placeholder={placeholder}
            {...register(name, rules)}
            {...rest}
            type={type}
            rows={rows}
            disabled={disabled}
            defaultValue={value}
            onChange={onChangeHandle}
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
            onChange={onChangeHandle}
            className={classnames('form-control', {
              'is-invalid': errors[name],
            })}
          />
        )}

        {errors[name] && (
          <div className="invalid-feedback">{errors[name].message}</div>
        )}
      </FormGroup>
    </Col>
  );
}

InputCustom.propTypes = {
  setfocused: PropTypes.any,
  focused: PropTypes.func,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.element,
};

export default InputCustom;
