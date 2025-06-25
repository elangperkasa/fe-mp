const ROOTS = {
  API: '/api',
  AUTH: '/auth',
  ACCOUNT: '/account',
  NOTIFICATION: '/notification',
  APPROVAL: '/approval',
  TERRITORY: '/territory',
  REGION: '/region',
  USER: '/userlist',
  ROLE: '/role',
  POSITION: '/position',
  ACTIVITY: '/activity',
  PRODUCT: '/product',
  PRODUCTADD: '/addproduct',
  USERADD: '/adduser',
  CUSTOMER: '/customer'
};

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  root: '/',

  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
  },

  account: {
    root: `${ROOTS.ACCOUNT}`,
  },

  notification: {
    root: `${ROOTS.NOTIFICATION}`,
  },

  approval: {
    root: `${ROOTS.APPROVAL}`,
    details: (id: string) => `${ROOTS.APPROVAL}/detail/${id}`,
  },

  territory: {
    root: `${ROOTS.TERRITORY}`,
  },

  region: {
    root: `${ROOTS.REGION}`,
  },

  user: {
    root: `${ROOTS.USER}`,
    details: (id: string) => `${ROOTS.USER}/detail/${id}`,
  },

  role: {
    root: `${ROOTS.ROLE}`,
  },

  position: {
    root: `${ROOTS.POSITION}`,
  },

  activity: {
    root: `${ROOTS.ACTIVITY}`,
  },

  product: {
    root: `${ROOTS.PRODUCT}`,
    details: (id: string) => `${ROOTS.PRODUCT}/detail/${id}`,
  },

  productadd: {
    root: `${ROOTS.PRODUCTADD}`,
  },
  customer: {
    root: `${ROOTS.CUSTOMER}`,
  },
  
};
