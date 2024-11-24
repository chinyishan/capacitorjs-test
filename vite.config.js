import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: true, port: 1300 },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // fs: 'pdfkit/js/virtual-fs.js',
      // 'iconv-lite': false,
      //  path: 'path-browserify',
      // 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    },
  },
});
