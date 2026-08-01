import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/app/hooks';
import { setCredentials } from '../slice';
import { PrimaryButton } from '@/components/Button';
import { TextInput } from '@/components/Input';
import { REGEX, VALIDATION } from '@/utils/constants';

interface RegisterValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: RegisterValues = { name: '', email: '', password: '', confirmPassword: '' };

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .max(VALIDATION.EMAIL_MAX_LENGTH, `Email must be less than ${VALIDATION.EMAIL_MAX_LENGTH} characters`)
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
    .matches(REGEX.PASSWORD_UPPERCASE, 'Password must contain at least one uppercase letter')
    .matches(REGEX.PASSWORD_LOWERCASE, 'Password must contain at least one lowercase letter')
    .matches(REGEX.PASSWORD_NUMBER, 'Password must contain at least one number')
    .matches(REGEX.PASSWORD_SPECIAL, 'Password must contain at least one special character'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(setCredentials({ user: { id: '1', name: values.name, email: values.email }, token: 'mock-token' }));
    toast.success('Account created successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
            <Form className="space-y-6" noValidate>
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Start building in minutes</p>
              </div>

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

              <Field
                name="password"
                as={TextInput}
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? errors.password : undefined}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                required
              />

              <Field
                name="confirmPassword"
                as={TextInput}
                label="Confirm Password"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
                placeholder="Repeat your password"
                autoComplete="new-password"
                required
              />

              <PrimaryButton type="submit" loading={isSubmitting} className="w-full">
                Create account
              </PrimaryButton>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
