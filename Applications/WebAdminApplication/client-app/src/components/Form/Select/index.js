import React from 'react';
import { FormGroup } from 'reactstrap';
import classnames from 'classnames';

export function Select({
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
  options,
  ...rest
}) {
  return (
    <FormGroup
      className={classnames({
        'has-danger': errors[name],
      })}
    >
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
          <option value={item.value}>{item.name}</option>
        ))}
      </select>
    </FormGroup>
  );
}
