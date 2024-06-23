import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import progress from 'vite-plugin-progress';
import TurboConsole from 'unplugin-turbo-console/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    progress(),
    TurboConsole(),
  ],
  resolve: {
    alias: {
      '@/plugins': fileURLToPath(new URL('./plugins', import.meta.url)),
      
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/common', import.meta.url)),

      '@documents': fileURLToPath(new URL('./src/documents', import.meta.url)),
      '@documents/directive': fileURLToPath(new URL('./src/documents/directive', import.meta.url)),
      '@documents/esz': fileURLToPath(new URL('./src/documents/esz', import.meta.url)),
      '@documents/review': fileURLToPath(new URL('./src/documents/review', import.meta.url)),

      '@document-routes': fileURLToPath(new URL('./src/document-routes', import.meta.url)),

      '@report': fileURLToPath(new URL('./src/report', import.meta.url)),
    }
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          }

          return `${extType}/[name]-[hash][extname]`;
        },

        chunkFileNames: 'js/[name]-[hash].js',

        entryFileNames: 'js/[name]-[hash].js',
        manualChunks: () => 'index.js',
      }
    }
  },
});