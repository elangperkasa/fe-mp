var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
// ----------------------------------------------------------------------
export default (function (_a) {
    var mode = _a.mode;
    process.env = __assign(__assign({}, process.env), loadEnv(mode, process.cwd()));
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
                    rewrite: function (path) { return path.replace(/^\/api/, ''); },
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
});
