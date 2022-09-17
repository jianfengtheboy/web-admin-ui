import { resolve } from 'path'
import { defineConfig, defineViteConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { loadEnv } from 'vite'
// jsx支持
import vueJsx from '@vitejs/plugin-vue-jsx'
// icon
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
// element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  main: {
    // env 变量前缀
    envPrefix: 'ELECTRON_VITE_',
    build: {
      rollupOptions: {
        external: ['@electron-toolkit/utils']
      }
    }
  },
  preload: {
    // env 变量前缀
    envPrefix: 'ELECTRON_VITE_',
    build: {
      rollupOptions: {
        external: ['@electron-toolkit/preload']
      }
    }
  },
  renderer: defineViteConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    const config = {
      // env 变量前缀
      envPrefix: 'ELECTRON_VITE_',
      plugins: [
        vue(),
        // jsx支持
        vueJsx(),
        // icon
        Icons({
          compiler: 'vue3',
          customCollections: {
            custom: FileSystemIconLoader(resolve('src/renderer/src/assets/icons'))
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
        })
      ],
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        },
        dedupe: ['vue']
      },
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
            modifyVars: {},
            additionalData: `@import "src/renderer/src/styles/mixin.less";@import "src/renderer/src/styles/theme.less";`
          }
        }
      },
      server: {
        host: '0.0.0.0',
        port: 9192,
        https: false,
        open: false,
        proxy: {
          '/api': {
            target: env.ELECTRON_VITE_PROXY_URL,
            changeOrigin: true,
            ws: true,
            rewrite: path => path.replace(/^\/api/, '')
          },
          // ws代理
          '/ws': {
            target: env.ELECTRON_VITE_PROXY_URL,
            ws: true
          }
        }
      }
    }

    return config
  })
})
