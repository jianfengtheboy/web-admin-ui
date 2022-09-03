import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// jsx支持
import vueJsx from '@vitejs/plugin-vue-jsx'
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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const config = {
    plugins: [
      vue(),
      // jsx支持
      vueJsx(),
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
            title: 'Vue Admin UI'
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
          additionalData: `@import "src/styles/mixin.scss";@import "src/styles/theme.scss";`
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
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        // ws代理
        '/ws': {
          target: env.VITE_PROXY_URL,
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
  }

  return config
})
