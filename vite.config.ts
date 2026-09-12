import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: 'src',
  base: '/',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        donate: resolve(__dirname, 'src/donate.html'),
        updates: resolve(__dirname, 'src/updates.html'),
        french: resolve(__dirname, 'src/fr.html'),
        about: resolve(__dirname, 'src/about.html'),
        projects: resolve(__dirname, 'src/projects.html'),
        team: resolve(__dirname, 'src/team.html'),
        contact: resolve(__dirname, 'src/contact.html'),
        membership: resolve(__dirname, 'src/membership.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@config': resolve(__dirname, './src/config'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils'),
      '@types': resolve(__dirname, './src/types'),
    },
  },
});
