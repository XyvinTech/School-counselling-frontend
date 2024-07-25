import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from '@svgr/rollup';

export default defineConfig({
  plugins: [
    react(),
    svgr(), 
  ],
  define: {
    global: {}, 
  },
  server: {
    port: 3000,
},
resolve: {
    alias: {
        './runtimeConfig': './runtimeConfig.browser',
    },
},
});
