import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'discord-domain-verification',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/.well-known/discord') {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              res.end('dh=64983162bbe248ba219bda041cc2b72ea0483525');
              return;
            }
            next();
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/.well-known/discord') {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              res.end('dh=64983162bbe248ba219bda041cc2b72ea0483525');
              return;
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
