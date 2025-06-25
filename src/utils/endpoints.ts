export const endpoints = {
  auth: {
    me: '/auth/me',
    login: '/auth/login',
    register: '/auth/register',
  },

  user: {
    list: '/user',
    search: '/user/search',
    syncIdaman: '/user/sync-idaman',
    details: (id: string) => `/user/${id}`,
  },

  outlet: {
    list: '/outlet',
    search: '/outlet/search',
    searchByProvince: '/outlet/searchByProvince',
    searchDistinctProvince: '/outlet/search-distinct-province',
    searchDistinctDistrict: '/outlet/search-distinct-district',
    searchCustom: '/outlet/search-custom',
    searchByRegion: '/outlet/search-outlet-region',
    searchBySam: '/outlet/search-outlet-sam',
    create: '/outlet',
    update: `/outlet/update`,
    delete: `/outlet/delete`,
    upload: `/outlet/upload`,
    details: (id: string) => `/outlet/${id}`,
  },

  pemenang: {
    list: '/eventundian',
    search: '/eventundian/search',
    details: (id: string) => `/outlet/${id}`,
  },

  eventUndian: {
    list: 'eventundian',
    roll: 'eventundian/roll',
    delete: 'eventundian/delete',
  },

  otpCustomer: {
    list: 'customer/otp-customer',
  },

  customer: {
    list: '/customer',
    createByAdmin: '/customer/new-by-admin',
    checkOtp: (id: string) => `/customer/otp/${id}`,
    updateStatus: (id: string) => `/customer/update-status/${id}`,
    adminUpdateStatus: (id: string) => `/customer/admin-approval/${id}`,
    checkWhatsappNo: (id: string) => `/customer/check-phone/${id}`,
    sentPromoCode: (id: string) => `/customer/sent-promo-code/${id}`,
    search: '/customer/search',
    upload: `/customer/upload`,
    syncIdaman: '/customer/sync-idaman',
    details: (id: string) => `/customer/${id}`,
  },

  leaderboard: {
    list: '/outlet-leaderboard',
    search: '/outlet-leaderboard/search',
    leader: '/outlet-leaderboard/leaderboard',
    leaderSpv: '/outlet-leaderboard/leaderboard-spv',
    leaderSd: '/outlet-leaderboard/leaderboard-sd',
    details: (id: string) => `/outlet-leaderboard/${id}`,
  },

  usageQr: {
    list: '/usage-qr',
    check: '/usage-qr/check',
  },

  otp: {
    list: '/send-otp',
    sentPromoCode: (id: string) => `/send-otp/sent-promo-code/${id}`,
    search: '/send-otp/search',
    syncIdaman: '/send-otp/sync-idaman',
    details: (id: string) => `/send-otp/${id}`,
  },

  lead: {
    list: '/lead',
    search: '/lead/search',
    syncIdaman: '/lead/sync-idaman',
    details: (id: string) => `/lead/${id}`,
  },

  listUndian: {
    list: '/listUndian',
    search: '/listUndian/search',
    syncIdaman: '/listUndian/sync-idaman',
    upload: '/listUndian/upload',
    prize: '/listUndian/distinct-prize',
    details: (id: string) => `/listUndian/${id}`,
  },

  tag: {
    list: '/tag',
    search: '/tag/search',
    request: '/tag',
    syncIdaman: '/tag/sync-idaman',
    realization: '/tag-real',
  },

  team: {
    list: '/team',
    search: '/team/search',
    request: '/team-request',
    syncIdaman: '/team/sync-idaman',
    realization: '/team-real',
  },

  post: {
    list: '/post-item',
    search: '/post-item/search',
    searchSubordinate: '/post-item/search-subordinate',
    featured: '/post-item/search-featured',
    upload: '/post-item/upload',
    request: '/post-item',
    realization: '/post-item-real',
    latest: '/post-item/latest',
  },

  vendor: {
    list: '/vendor',
    countQR: (id: number) => `/qr-master/count/${id}`,
    request: '/vendor-request',
    realization: '/vendor-real',
  },

  ptpl: {
    qrMaster: '/qr-master',
    qaCheck: '/qa-check',
    prodUsage: '/prod-usage',
  },

  /// THEME
  chat: '/chat',
  kanban: '/kanban',
  calendar: '/calendar',
  mail: {
    list: '/mail/list',
    details: '/mail/details',
    labels: '/mail/labels',
  },

  product: {
    list: '/product/list',
    details: '/product/details',
    search: '/product/search',
  },
};
