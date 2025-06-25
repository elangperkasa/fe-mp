import { paths } from './pages/paths';

// API
export const HOST = import.meta.env.VITE_HOST;
export const HOST_API = import.meta.env.VITE_HOST_API;
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;
export const API_KEY = import.meta.env.VITE_API_KEY;
export const GOOGLE_SITE_KEY = import.meta.env.VITE_GOOGLE_SITE_KEY;

export const IDAMAN = {
  viteIdamanAuthority: import.meta.env.VITE_IDAMAN_AUTHORITY,
  viteIdamanClientId: import.meta.env.VITE_IDAMAN_CLIENT_ID,
  viteIdamanClientSecret: import.meta.env.VITE_IDAMAN_CLIENT_SECRET,
  viteIdamanRedirectUri: import.meta.env.VITE_IDAMAN_REDIRECT_URI,
  viteIdamanPostLogoutRedirectUrl: import.meta.env.VITE_IDAMAN_POST_LOGOUT_REDIRECT_URL,
};

export const IDAMAN_CONFIG = {
  authority: IDAMAN.viteIdamanAuthority,
  client_id: IDAMAN.viteIdamanClientId,
  client_secret: IDAMAN.viteIdamanClientSecret,
  redirect_uri: IDAMAN.viteIdamanRedirectUri,
  response_type: 'code',
  scope:
    'openid profile email api.auth user.read user.readAll user.role position.readAll unit.readAll position.read unit.read',
  post_logout_redirect_uri: IDAMAN.viteIdamanPostLogoutRedirectUrl,
};

export const IS_CAPTCHA_ACTIVE = import.meta.env.VITE_IS_CAPTCHA;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.approval.root;

export const ACCESS_TOKEN_KEY = 'accessToken';
export const LOGIN_METHOD_KEY = 'method';

export const MAP_ID = '70a0fe702821572b';

// ROLE GROUPING
export const SUPER_ROLE = ['SUPER_ADMIN'];
export const LOG_ACTIVITY_ROLE = ['SUPER_ADMIN', 'ADMIN_CENTRAL'];
export const BASIC_ROLE = ['SUPER_ADMIN', 'SAM', 'ADMIN_CENTRAL', 'VIEWER'];
