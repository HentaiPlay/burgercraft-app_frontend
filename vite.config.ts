import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import checker from 'vite-plugin-checker'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  server: {
    port: 5000,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/shared'),
      find: '@vue/runtime-core',
      replacement: '@vue/runtime-core/dist/runtime-core.esm-bundler.js'
    },
    extensions: ['.js', '.ts', '.vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@assets/styles/element/index.scss" as *;
          @use "@assets/styles/_mixins.scss" as mixins;
          @use "@assets/styles/_colors.scss" as colors;
        `
      }
    }
  },
  plugins: [
    vue(),
    eslintPlugin(),
    checker({
      vueTsc: true
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: 'src/components.d.ts'
    })
  ]
})
