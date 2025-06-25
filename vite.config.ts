import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// ----------------------------------------------------------------------

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    publicDir: './public',
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: /^~(.+)/,
          replacement: path.join(process.cwd(), 'node_modules/$1'),
        },
        {
          find: /^src(.+)/,
          replacement: path.join(process.cwd(), 'src/$1'),
        },
      ],
    },
    server: {
      port: 3000,
      host: true,
      proxy: {
        '/api': {
          target: 'https://34.128.117.84',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    preview: {
      port: 443,
      host: true,
      https: {
        cert: process.env.VITE_TLS_CERT,
        key: process.env.VITE_TLS_KEY,
      },
    },
  });
};
