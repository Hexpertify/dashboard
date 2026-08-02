import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import LinearProgress from '@mui/material/LinearProgress';
import { REGEX, VALIDATION } from '@/utils/constants';

interface PasswordFormProps {
  onSuccess?: () => void;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialValues: PasswordFormValues = { currentPassword: '', newPassword: '', confirmPassword: '' };

const validationSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
    .matches(REGEX.PASSWORD_UPPERCASE, 'Password must contain at least one uppercase letter')
    .matches(REGEX.PASSWORD_LOWERCASE, 'Password must contain at least one lowercase letter')
    .matches(REGEX.PASSWORD_NUMBER, 'Password must contain at least one number')
    .matches(REGEX.PASSWORD_SPECIAL, 'Password must contain at least one special character'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
});

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

function getPasswordStrength(password: string): number {
  if (!password) return 0;
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) return 1;
  const score =
    Number(REGEX.PASSWORD_UPPERCASE.test(password)) +
    Number(REGEX.PASSWORD_LOWERCASE.test(password)) +
    Number(REGEX.PASSWORD_NUMBER.test(password)) +
    Number(REGEX.PASSWORD_SPECIAL.test(password));
  return score;
}

function getStrengthColor(score: number): 'error' | 'warning' | 'info' | 'success' {
  if (score <= 1) return 'error';
  if (score === 2) return 'warning';
  if (score === 3) return 'info';
  return 'success';
}

export function PasswordForm({ onSuccess }: PasswordFormProps) {
  const handleSubmit = async (_values: PasswordFormValues, { resetForm }: { resetForm: () => void }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    resetForm();
    toast.success('Password updated successfully!');
    onSuccess?.();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => {
        const strength = getPasswordStrength(values.newPassword);
        return (
          <Form className="space-y-6" noValidate>
            <div className="space-y-1.5">
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Current Password
              </label>
              <Field
                name="currentPassword"
                as="input"
                id="currentPassword"
                type="password"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.currentPassword && errors.currentPassword
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                autoComplete="current-password"
              />
              {touched.currentPassword && errors.currentPassword && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.currentPassword}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <Field
                name="newPassword"
                as="input"
                id="newPassword"
                type="password"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.newPassword && errors.newPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                autoComplete="new-password"
              />
              {touched.newPassword && errors.newPassword && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.newPassword}</p>
              )}
              {values.newPassword && (
                <div className="mt-2 space-y-1">
                  <LinearProgress
                    variant="determinate"
                    value={(strength / 4) * 100}
                    color={getStrengthColor(strength)}
                    sx={{ height: 6, borderRadius: 9999, backgroundColor: 'rgba(128, 128, 128, 0.2)' }}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Strength: {strengthLabels[strength]}</p>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm New Password
              </label>
              <Field
                name="confirmPassword"
                as="input"
                id="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.confirmPassword && errors.confirmPassword
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                autoComplete="new-password"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
