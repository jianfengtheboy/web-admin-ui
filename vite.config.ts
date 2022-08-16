import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// gzip
import viteCompression from 'vite-plugin-compression'
// icon
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
// element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 处理html
import { createHtmlPlugin } from 'vite-plugin-html'

const path = require('path')
const resolve = (dir: string) => path.resolve(process.cwd(), dir)

const proxyDns = {
  testIp: '',
  developIp: 'http://xx.xx.xx.xx'
}
const currProxy = proxyDns.developIp

export default defineConfig({
  plugins: [
    vue(),
    // gzip打包压缩配置
    viteCompression({
      verbose: true,
      disable: false,
      deleteOriginFile: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    // icon
    Icons({
      compiler: 'vue3',
      customCollections: {
        custom: FileSystemIconLoader(resolve('src/assets/icons'))
      }
    }),
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: true,
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'icon',
          customCollections: ['custom']
        })
      ]
    }),
    // 处理html
    createHtmlPlugin({
      template: 'index.html',
      inject: {
        data: {
          title: 'vue-admin-ui'
        }
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
      scss: {
        additionalData: '@import "./src/styles/index.scss";'
      }
    }
  },
  base: './',
  server: {
    host: '0.0.0.0',
    port: 9192,
    https: false,
    open: false,
    proxy: {
      '/api': {
        target: `${currProxy}:8080`, // 端口应与开发环境一致
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\//, '/')
      },
      // ws代理
      '/ws': {
        target: `${currProxy}:8080`, // 端口应与开发环境一致
        ws: true
      }
    }
  },
  build: {
    outDir: 'dist/web',
    assetsDir: 'static',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
