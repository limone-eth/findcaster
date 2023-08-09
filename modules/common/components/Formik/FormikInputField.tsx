import { Input } from '@/modules/application/components/DesignSystem';

import FormikField from './FormikField';

const FormikInputField = (props) => {
  const { name, label: upstreamLabel, onChange: upstreamOnChange, ...upstreamProps } = props;

  const label = typeof upstreamLabel !== 'string' ? '' : upstreamLabel;

  const renderInput = ({ field: { name: fieldName, value, onChange }, meta: { touched, error } }) => (
    <Input
      name={fieldName}
      value={value}
      status={touched && error ? 'invalid' : ''}
      {...upstreamProps}
      onChange={(e) => {
        upstreamOnChange && upstreamOnChange(e);
        onChange(e);
      }}
    />
  );

  return <FormikField name={name} input={renderInput} label={label} {...props} />;
};

export default FormikInputField;
