import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Row } from 'reactstrap';

export function FormCustom({ defaultValues, children, onSubmit }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return defaultValues;
    }, [defaultValues]),
  });
  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {Array.isArray(children)
          ? children.map((child) => {
              return child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      register,
                      key: child.props.name,
                      errors: errors,
                    },
                  })
                : child;
            })
          : children}
      </Row>
    </form>
  );
}
