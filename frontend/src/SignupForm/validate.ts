import validator from 'validator';
import { UnauthedUser } from './types';

type Error = {
  username?: string;
  password?: string;
};

export const validateSignUpForm = (payload: UnauthedUser) => {
  const errors: Error = {};
  let message = '';
  let isFormValid = true;

  if (
    !payload ||
    typeof payload.username !== 'string' ||
    payload.username.trim().length === 0
  ) {
    isFormValid = false;
    errors.username = 'Please provide a user name.';
  }

  if (
    !payload ||
    typeof payload.password !== 'string' ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
};
