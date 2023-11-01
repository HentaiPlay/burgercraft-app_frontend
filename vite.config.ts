import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin(),
    checker({
      vueTsc: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      find: '@vue/runtime-core',
      replacement: '@vue/runtime-core/dist/runtime-core.esm-bundler.js'
    },
    extensions: ['.js', '.ts', '.vue']
  },
  server: {
    port: 5000,
    watch: {
      usePolling: true
    }
  }
})
