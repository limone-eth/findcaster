import { Children } from 'react';

import { Select } from '@/modules/application/components/DesignSystem';

import FormikField from './FormikField';

const FormikSelectField = ({ children, ...props }: any) => {
  const { name, label: upstreamLabel, ...upstreamProps } = props;

  const label = typeof upstreamLabel !== 'string' ? '' : upstreamLabel;

  const renderInput = ({ field: { name: fieldName, value, onChange, onBlur }, meta: { touched, error } }) => (
    <Select
      name={fieldName}
      value={value?.id || value}
      onChange={onChange}
      onBlur={onBlur}
      status={touched && error ? 'invalid' : ''}
      {...upstreamProps}
    >
      {Children.map(children, (child) => child)}
    </Select>
  );

  return <FormikField name={name} input={renderInput} label={label} {...props} />;
};

export default FormikSelectField;
