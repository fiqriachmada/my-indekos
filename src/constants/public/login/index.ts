export const PUBLIC_LOGIN_CONSTANTS = {
  ROUTES: {
    SELF: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    REGISTER: '/register',
    DASHBOARD_REDIRECT: '/protected/dashboard',
  },
  FORM_KEYS: {
    EMAIL: 'email',
    PASSWORD: 'password',
  },
  STORAGE_KEYS: {
    REMEMBER_EMAIL: 'my_indekos_remembered_email',
  },
} as const
