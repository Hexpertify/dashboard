import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { PrimaryButton } from '@/components/Button';
import { TextInput } from '@/components/Input';
import type { UserFormData, UserRole, UserStatus } from '../types';
import { initialUserFormData } from '../types';

interface UserFormProps {
  initialValues?: Partial<UserFormData>;
  submitLabel?: string;
  loading?: boolean;
  onSubmit: (data: UserFormData) => void;
}

const roleOptions: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

const statusOptions: { value: UserStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' },
];

const roleValues = roleOptions.map((option) => option.value);
const statusValues = statusOptions.map((option) => option.value);

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .max(254, 'Email must be less than 254 characters')
    .email('Invalid email format'),
  role: yup.string().oneOf(roleValues).required('Role is required'),
  status: yup.string().oneOf(statusValues).required('Status is required'),
  phone: yup.string(),
  department: yup.string(),
});

export function UserForm({ initialValues, submitLabel = 'Save User', loading = false, onSubmit }: UserFormProps) {
  return (
    <Formik
      initialValues={{ ...initialUserFormData, ...initialValues }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              name="name"
              as={TextInput}
              label="Full Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name ? errors.name : undefined}
              placeholder="John Doe"
              autoComplete="name"
              required
            />

            <Field
              name="email"
              as={TextInput}
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email ? errors.email : undefined}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <div className="space-y-1.5">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <Field
              name="phone"
              as={TextInput}
              label="Phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone ? errors.phone : undefined}
              placeholder="+1 555-0100"
              autoComplete="tel"
            />

            <Field
              name="department"
              as={TextInput}
              label="Department"
              type="text"
              value={values.department}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.department ? errors.department : undefined}
              placeholder="Engineering"
            />
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <PrimaryButton type="submit" loading={loading}>
              {submitLabel}
            </PrimaryButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}
