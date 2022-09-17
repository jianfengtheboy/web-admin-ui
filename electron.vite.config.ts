import { resolve } from 'path'
import { defineConfig, defineViteConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { loadEnv } from 'vite'

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
      plugins: [vue()],
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
            additionalData: ``
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
