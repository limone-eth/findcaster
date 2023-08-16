'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { executeGetQuery } from '@/models/application/services/InternalApiService';
import { Button } from '@/modules/application/components/DesignSystem';
import { FormikInputField } from '@/modules/common/components/Formik';

const validationSchema = yup.object().shape({
  query: yup.string().trim().required('Enter a query'),
});

const SearchForm = ({ onResults }) => (
  <Formik
    onSubmit={async ({ username, orderBy, orderDir, limit, page, poapEventIds }) => {
      const searchParams = new URLSearchParams();
      searchParams.append('username', username);
      searchParams.append('orderBy', orderBy);
      searchParams.append('orderDir', orderDir);
      searchParams.append('limit', limit.toString());
      searchParams.append('page', page.toString());
      if (poapEventIds) {
        poapEventIds.split(',').map((id) => searchParams.append('poapEventId', id.trim()));
      }

      const queryString = searchParams.toString();

      const user = await executeGetQuery(`/profiles?${queryString}`);
      onResults(user);
    }}
    initialValues={{
      username: '',
      orderBy: 'id',
      orderDir: 'desc',
      limit: 12,
      page: 0,
      poapEventIds: '',
    }}
    validateOnBlur={true}
    // TODO: remove this
    // validationSchema={validationSchema}
  >
    {({ isSubmitting }) => (
      <Form>
        <div className="relative flex  items-center justify-center">
          <div className="flex flex-col">
            <div className="flex flex-row gap-4 ">
              <FormikInputField name="username" size="xl" placeholder="limone.eth" />
              <Button type="submit" size="xl" status={isSubmitting ? 'busy' : ''}>
                <Button.Icon icon={<MagnifyingGlassIcon className="w-5" />} />
              </Button>
            </div>
            <div className="mt-4">
              <label htmlFor="orderBy" className="mb-1 text-sm font-medium text-gray-600">
                poap event ids:
              </label>
              <FormikInputField name="poapEventIds" size="xl" placeholder="152, 1953, 9843" />
            </div>
            <div className="mt-4 flex flex-row gap-4">
              <div className="flex flex-col">
                <label htmlFor="orderBy" className="mb-1 text-sm font-medium text-gray-600">
                  order by:
                </label>
                <Field as="select" name="orderBy" id="orderBy" className="form-select">
                  <option value="id">id</option>
                  <option value="followers">num followers</option>
                  <option value="following">num following</option>
                </Field>
              </div>

              <div className="flex flex-col">
                <label htmlFor="orderDir" className="mb-1 text-sm font-medium text-gray-600">
                  order direction:
                </label>
                <Field as="select" name="orderDir" id="orderDir" className="form-select">
                  <option value="asc">ascending</option>
                  <option value="desc">descending</option>
                </Field>
              </div>

              <div className="flex flex-col">
                <label htmlFor="limit" className="mb-1 text-sm font-medium text-gray-600">
                  max results:
                </label>
                <Field as="select" name="limit" id="limit" className="form-select">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </Field>
              </div>
            </div>
          </div>
        </div>
      </Form>
    )}
  </Formik>
);

export default SearchForm;
