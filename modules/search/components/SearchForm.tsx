'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Form, Formik } from 'formik';

import { Button } from '@/modules/application/components/DesignSystem';
import FormikPoapAdvancedSelectField from '@/modules/common/components/Formik/FormikPoapAdvancedSelectField';

const SearchForm = ({ onResults }) => (
  <Formik
    onSubmit={async ({ poaps }) => {
      onResults(poaps);
    }}
    initialValues={{
      poaps: [],
    }}
    validateOnBlur={true}
  >
    {({ isSubmitting }) => (
      <Form>
        <div className="relative flex  items-center justify-center">
          <div className="flex flex-col">
            <div className="flex flex-row gap-4 ">
              <FormikPoapAdvancedSelectField name="poaps" size="xl" />
              <Button type="submit" size="xl" status={isSubmitting ? 'busy' : ''}>
                <Button.Icon icon={<MagnifyingGlassIcon className="w-5" />} />
              </Button>
            </div>
          </div>
        </div>
      </Form>
    )}
  </Formik>
);

export default SearchForm;
