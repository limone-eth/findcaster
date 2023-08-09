import { Field } from 'formik';

import { Label, Stack } from '@/modules/application/components/DesignSystem';

const FormikField = ({ name, label, input, validate, children }) => {
  const renderLabel = () => {
    if (!label) {
      return null;
    }

    return <Label name={name}>{label}</Label>;
  };

  return (
    <Field name={name} validate={validate}>
      {({ field, form, meta }) => {
        let errorMessage;
        if (meta.touched) {
          errorMessage = meta.error;
          if (meta.error) {
            if (Array.isArray(meta.error)) {
              errorMessage = meta.error
                .filter(Boolean)
                .map((err) => err.toString())
                .join(' · ');
            } else if (typeof meta.error === 'object') {
              errorMessage = Object.values(meta.error);
            } else {
              errorMessage = meta.error.toString();
            }
          }
        }

        return (
          <Stack spacing="xxs">
            <Stack.Item>
              {renderLabel()}
              {children ? children({ field, form, meta }) : input({ field, form, meta })}
            </Stack.Item>
            {errorMessage && (
              <Stack.Item>
                <span className="text-sm text-red-500">{errorMessage}</span>
              </Stack.Item>
            )}
          </Stack>
        );
      }}
    </Field>
  );
};

export default FormikField;
