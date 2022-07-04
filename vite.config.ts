import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

const path = require('path')
const resolve = (dir: string) => path.resolve(process.cwd(), dir)

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: true,
      resolvers: [
        IconsResolver({
          prefix: 'icon',
          customCollections: ['custom']
        })
      ]
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        custom: FileSystemIconLoader(resolve('src/assets/icons'))
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    },
    dedupe: ['vue']
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {},
        additionalData: ``
      }
    }
  },
  server: {
    open: false,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'xxxxx',
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
