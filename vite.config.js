// vite.config.js
const { resolve } = require('path')
import vue from '@vitejs/plugin-vue'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        faqs: resolve(__dirname, 'faqs/index.html')
      }
    }
  }
}
