export const PUBLIC_PROPERTIES_CONSTANTS = {
  ROUTES: {
    SELF: '/properties',
    DETAIL: (id: string) => `/properties/${id}`,
  },
  DEFAULT_PAGE_SIZE: 12,
  FILTER_DEFAULTS: {
    TYPE: 'all',
    ONLY_AVAILABLE: true,
  },
} as const
