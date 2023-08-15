'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button } from '@/modules/application/components/DesignSystem';
import { FormikInputField } from '@/modules/common/components/Formik';

const validationSchema = yup.object().shape({
  query: yup.string().trim().required('Enter a query'),
});

const SearchForm = () => (
  <Formik
    onSubmit={async ({ query }) => {
      console.log(query);
    }}
    initialValues={{
      query: '',
    }}
    validateOnBlur={true}
    validationSchema={validationSchema}
  >
    {() => (
      <Form>
        <div className="m-auto flex w-full max-w-sm flex-row items-start space-x-2">
          <FormikInputField name="query" size="xl" placeholder="limone.eth" />
          <Button type="submit" size="xl">
            <Button.Icon icon={<MagnifyingGlassIcon className="w-5" />} />
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default SearchForm;
