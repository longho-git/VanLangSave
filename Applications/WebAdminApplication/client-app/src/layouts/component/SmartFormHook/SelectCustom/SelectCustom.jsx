import React from 'react';
import { Col, FormGroup } from 'reactstrap';
import classnames from 'classnames';

export function SelectCustom({
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
  col = 12,
  options,
  ...rest
}) {
  return (
    <Col className="align-self-center" md={col}>
      <FormGroup
        className={classnames({
          'has-danger': errors[name],
        })}
      >
        <label className="form-control-label" htmlFor="validationServer04">
          {label}
        </label>
        <select
          {...register(name, rules)}
          {...rest}
          disabled={disabled}
          defaultValue={value}
          aria-invalid={errors[name] ? true : false}
          onChange={onChange}
          className={classnames('form-control', {
            'is-invalid': errors[name],
          })}
        >
          {options.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
      </FormGroup>
    </Col>
  );
}
