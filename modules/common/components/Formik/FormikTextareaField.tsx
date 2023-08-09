import { forwardRef } from 'react';

import { Textarea } from '@/modules/application/components/DesignSystem';

import FormikField from './FormikField';

const FormikTextareaField = forwardRef<any, any>(({ ...props }, ref) => {
  const { onChange: upstreamOnChange } = props;
  const renderInput = ({ field: { name: fieldName, value, onChange, onBlur }, meta: { touched, error } }) => (
    <Textarea
      {...props}
      ref={ref}
      name={fieldName}
      value={value}
      onChange={(_value) => {
        upstreamOnChange && upstreamOnChange(_value);
        onChange(_value);
      }}
      onBlur={onBlur}
      status={touched && error ? 'invalid' : ''}
    />
  );

  return <FormikField input={renderInput} {...props} />;
});

export default FormikTextareaField;
