import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PrimaryButton } from '@/components/Button';
import { TextInput } from '@/components/Input';

const initialValues = { email: '' };

const validationSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .max(254, 'Email must be less than 254 characters')
    .email('Invalid email format'),
});

export function ForgotPasswordForm() {
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const handleSubmit = async (values: { email: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSentEmail(values.email);
    toast.success('Password reset link sent!');
  };

  if (sentEmail) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Check your email</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            We've sent a password reset link to <strong>{sentEmail}</strong>
          </p>
        </div>
        <Link to="/login" className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form className="space-y-6" noValidate>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Forgot password?</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Enter your email and we'll send you a reset link
            </p>
          </div>

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

          <PrimaryButton type="submit" loading={isSubmitting} className="w-full">
            Send reset link
          </PrimaryButton>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Remembered your password?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
