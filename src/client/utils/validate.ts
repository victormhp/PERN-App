import { type Validation } from '../hooks/useForm';

export const emailValidation: Validation = {
  required: {
    value: true,
    message: 'You need to enter your email.',
  },
  pattern: {
    value: '^[\\w.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    message: "Invalid email. Make sure it's written like example@email.com",
  },
};

export const passwordValidation: Validation = {
  required: {
    value: true,
    message: 'You need to enter a password.',
  },
  custom: {
    isValid: (value: string) => value.length >= 6,
    message: 'The password needs to be at least 6 characters long.',
  },
};

export const usernameValidation: Validation = {
  required: {
    value: true,
    message: 'You need to enter a username.',
  },
  custom: {
    isValid: (value: string) => value.length >= 4,
    message: 'The username needs to be at least 4 characters long.',
  },
};

export const noteTitleValidation: Validation = {
  required: {
    value: true,
  },
};

export const noteDesciptionValidation: Validation = {
  required: {
    value: true,
  },
};
