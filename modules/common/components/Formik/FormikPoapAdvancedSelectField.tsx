import { useFormikContext } from 'formik';

import { PoapAdvancedSelect } from '@/modules/common/components/AdvancedSelect';

import FormikField from './FormikField';

const FormikPoapAdvancedSelectField = (props) => {
  const { values, setFieldValue } = useFormikContext();

  const { name, label: upstreamLabel, status, ...upstreamProps } = props;

  const label = typeof upstreamLabel !== 'string' ? '' : upstreamLabel;

  const renderInput = ({ field: { name: fieldName, value } }) => (
    <PoapAdvancedSelect
      value={value}
      onSelect={(item) => {
        setFieldValue(fieldName, values[fieldName].concat(item));
      }}
      {...upstreamProps}
      status={status}
    />
  );

  return <FormikField name={name} input={renderInput} label={label} {...props} />;
};

export default FormikPoapAdvancedSelectField;
