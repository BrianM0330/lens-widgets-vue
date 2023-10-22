import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'lens-widgets-vue',
      fileName: 'lens-widgets-vue'
    }
  },
  rollupOptions: {
    external: ["vue", "vue-demi"],

    globals: {
      vue: "Vue",
    }
  },
  plugins: [vue()],
})
