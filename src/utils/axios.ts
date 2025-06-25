import axios, { AxiosRequestConfig } from 'axios';
// config
import { ACCESS_TOKEN_KEY, HOST_API, IDAMAN_CONFIG, LOGIN_METHOD_KEY } from 'src/config-global';
import { toast } from 'react-toastify';
import Oidc from 'oidc-client';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  const method = sessionStorage.getItem(LOGIN_METHOD_KEY);

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  if (method) {
    config.headers['X-Identity-Method'] = method;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;

    if (status === 403) {
      console.warn('Access forbidden: You do not have permission.');

      toast.error('Access forbidden: You do not have permission.', {
        autoClose: false,
      });

      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(LOGIN_METHOD_KEY);

      const mgr = new Oidc.UserManager(IDAMAN_CONFIG);

      setTimeout(() => {
        void mgr.signoutRedirect();
      }, 5000);
    }

    return Promise.reject(error || 'Something went wrong');
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------
