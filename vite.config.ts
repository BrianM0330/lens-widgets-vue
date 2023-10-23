import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'lens-widgets-vue',
      fileName: 'lens-widgets-vue'
    }
  },
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  rollupOptions: {
    external: ["vue-demi"],
    plugins: [
      peerDepsExternal(),
      typescript({ include: ['src/components/**/*' ]})
    ]
  }
})
