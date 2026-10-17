export const PUBLIC_REGISTER_CONSTANTS = {
  ROUTES: {
    SELF: '/register',
    LOGIN: '/login',
    TERMS: '/terms',
    PRIVACY: '/privacy',
  },
  FORM_KEYS: {
    FULL_NAME: 'fullName',
    EMAIL: 'email',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
    PHONE: 'phoneNumber',
  },
} as const
