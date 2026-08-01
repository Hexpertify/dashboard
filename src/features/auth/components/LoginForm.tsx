import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/app/hooks';
import { setCredentials } from '../slice';
import { PrimaryButton } from '@/components/Button';
import { TextInput } from '@/components/Input';

interface LoginValues {
  email: string;
  password: string;
}

const initialValues: LoginValues = { email: '', password: '' };

const validationSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .max(254, 'Email must be less than 254 characters')
    .email('Invalid email format'),
  password: yup.string().required('Password is required'),
});

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(setCredentials({ user: { id: '1', name: 'John Doe', email: values.email }, token: 'mock-token' }));
    toast.success('Welcome back!');
    navigate('/dashboard');
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form className="space-y-6" noValidate>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Sign in to your account</p>
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

          <Field
            name="password"
            as={TextInput}
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password ? errors.password : undefined}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot password?
            </Link>
          </div>

          <PrimaryButton type="submit" loading={isSubmitting} className="w-full">
            Sign in
          </PrimaryButton>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
