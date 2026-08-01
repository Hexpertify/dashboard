import { REGEX, VALIDATION } from './constants';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateEmail(email: string): ValidationResult {
  if (!email) return { valid: false, error: 'Email is required' };
  if (email.length > VALIDATION.EMAIL_MAX_LENGTH) {
    return { valid: false, error: `Email must be less than ${VALIDATION.EMAIL_MAX_LENGTH} characters` };
  }
  if (!REGEX.EMAIL.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  return { valid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!password) return { valid: false, error: 'Password is required' };
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return { valid: false, error: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters` };
  }
  if (!REGEX.PASSWORD_UPPERCASE.test(password)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter' };
  }
  if (!REGEX.PASSWORD_LOWERCASE.test(password)) {
    return { valid: false, error: 'Password must contain at least one lowercase letter' };
  }
  if (!REGEX.PASSWORD_NUMBER.test(password)) {
    return { valid: false, error: 'Password must contain at least one number' };
  }
  if (!REGEX.PASSWORD_SPECIAL.test(password)) {
    return { valid: false, error: 'Password must contain at least one special character' };
  }
  return { valid: true };
}

export function validateRequired(value: string, fieldName = 'Field'): ValidationResult {
  if (!value || !value.trim()) {
    return { valid: false, error: `${fieldName} is required` };
  }
  return { valid: true };
}

export function validateMaxLength(value: string, max: number, fieldName = 'Field'): ValidationResult {
  if (value.length > max) {
    return { valid: false, error: `${fieldName} must be less than ${max} characters` };
  }
  return { valid: true };
}

export function validateMinLength(value: string, min: number, fieldName = 'Field'): ValidationResult {
  if (value.length < min) {
    return { valid: false, error: `${fieldName} must be at least ${min} characters` };
  }
  return { valid: true };
}

export function validateUrl(url: string): ValidationResult {
  if (!url) return { valid: true };
  if (!REGEX.URL.test(url)) {
    return { valid: false, error: 'Invalid URL format' };
  }
  return { valid: true };
}

export function validateSlug(slug: string): ValidationResult {
  if (!slug) return { valid: false, error: 'Slug is required' };
  if (!REGEX.SLUG.test(slug)) {
    return { valid: false, error: 'Slug can only contain lowercase letters, numbers, and hyphens' };
  }
  return { valid: true };
}

export function validateConfirmPassword(password: string, confirmPassword: string): ValidationResult {
  if (!confirmPassword) return { valid: false, error: 'Please confirm your password' };
  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords do not match' };
  }
  return { valid: true };
}

export function validateMetaTitle(title: string): ValidationResult {
  const required = validateRequired(title, 'Meta Title');
  if (!required.valid) return required;
  const maxLength = validateMaxLength(title, VALIDATION.META_TITLE_MAX, 'Meta Title');
  if (!maxLength.valid) return maxLength;
  return { valid: true };
}

export function validateMetaDescription(description: string): ValidationResult {
  if (!description) return { valid: true };
  const maxLength = validateMaxLength(description, VALIDATION.META_DESCRIPTION_MAX, 'Meta Description');
  if (!maxLength.valid) return maxLength;
  return { valid: true };
}

export function validateOgTitle(title: string): ValidationResult {
  if (!title) return { valid: true };
  const maxLength = validateMaxLength(title, VALIDATION.OG_TITLE_MAX, 'Open Graph Title');
  if (!maxLength.valid) return maxLength;
  return { valid: true };
}

export function validateOgDescription(description: string): ValidationResult {
  if (!description) return { valid: true };
  const maxLength = validateMaxLength(description, VALIDATION.OG_DESCRIPTION_MAX, 'Open Graph Description');
  if (!maxLength.valid) return maxLength;
  return { valid: true };
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateForm<T extends Record<string, unknown>>(
  data: T,
  validators: { [K in keyof T]: (value: T[K]) => ValidationResult }
): FormValidationResult {
  const errors: Record<string, string> = {};

  for (const key of Object.keys(validators) as (keyof T)[]) {
    const validator = validators[key];
    const result = validator(data[key]);
    if (!result.valid && result.error) {
      errors[key as string] = result.error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}