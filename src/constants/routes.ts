import { PUBLIC_NAV_CONSTANTS, PUBLIC_LOGIN_CONSTANTS, PUBLIC_PROPERTIES_CONSTANTS } from '@/constants'

export const routes = {
  // Public
  home: () => PUBLIC_NAV_CONSTANTS.ROUTES.HOME,
  properties: () => PUBLIC_NAV_CONSTANTS.ROUTES.PROPERTIES,
  propertyDetail: (id: string) => PUBLIC_PROPERTIES_CONSTANTS.ROUTES.DETAIL(id),
  features: () => PUBLIC_NAV_CONSTANTS.ROUTES.FEATURES,
  about: () => PUBLIC_NAV_CONSTANTS.ROUTES.ABOUT,

  // Auth
  login: (redirect?: string) => {
    const base = PUBLIC_LOGIN_CONSTANTS.ROUTES.SELF
    return redirect ? `${base}?redirect=${encodeURIComponent(redirect)}` : base
  },
  register: () => PUBLIC_LOGIN_CONSTANTS.ROUTES.REGISTER,
  forgotPassword: () => PUBLIC_LOGIN_CONSTANTS.ROUTES.FORGOT_PASSWORD,

  // Protected
  dashboard: () => PUBLIC_NAV_CONSTANTS.ROUTES.DASHBOARD,
  rooms: () => '/protected/rooms',
  roomDetail: (id: string) => `/protected/rooms/detail/${id}`,
  members: () => '/protected/members',
  utilities: () => '/protected/utilities',
  settings: () => '/protected/settings',
  notifications: () => '/protected/notifications',
  profile: () => '/protected/profile',
  profileSettings: () => '/protected/settings/profile',
  apiProfile: () => '/protected/api/profile',
} as const
