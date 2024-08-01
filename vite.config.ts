import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { fileURLToPath, URL } from 'url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// vue 自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// mock
import { viteMockServe } from 'vite-plugin-mock'

const loadEnvByMode = (mode: any, env: any) => {
	return loadEnv(mode, process.cwd())[env]
}

export default defineConfig(({ command, mode }) => {
	const config = {
		base: './',
		plugins: [
			vue(),
			vueJsx(),
			AutoImport({
				// 自动导入vue相关函数，如: ref、reactive、toRef等
				imports: ['vue', 'vue-router', 'pinia'],
				dts: 'src/auto-import.d.ts'
			}),
			Components({
				// 指定组件位置，默认是 src/components 自动导入自定义组件
				dirs: ['src/components'],
				extensions: ['vue', 'tsx'],
				// 配置文件生成位置
				dts: 'src/components.d.ts'
			}),
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
				// 指定symbolId格式
				symbolId: 'icon-[dir]-[name]'
			}),
			viteMockServe({
				// 目录位置
				mockPath: './src/mock/',
				// 是否在控制台显示请求日志
				logger: true,
				// 是否读取ts文件模块
				supportTs: true,
				// 设置是否启用本地mock文件
				localEnabled: command === 'serve',
				// 设置打包是否启用mock功能
				prodEnabled: command !== 'serve' && true,
				// 这样可以控制关闭mock的时候不让mock打包到最终代码内
				injectCode: `
				  import { setupProdMockServer } from '../src/mock/index';
				  setupProdMockServer();
				`
			})
		],
		resolve: {
			alias: {
				'~': fileURLToPath(new URL('./', import.meta.url)),
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		},
		build: {
			// 消除打包大小超过500kb警告
			chunkSizeWarningLimit: 2000,
			// 指定打包路径
			outDir: loadEnvByMode(mode, 'VITE_OUT_DIR'),
			// Vite 2.6.x 以上需要配置 minify："terser"，terserOptions才能生效
			minify: 'terser' as 'terser',
			terserOptions: {
				compress: {
					// 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
					keep_infinity: true,
					// 生产环境去除 console
					drop_console: true,
					// 生产环境去除 debugger
					drop_debugger: true
				},
				format: {
					// 删除注释
					comments: false
				}
			},
			// 静态资源打包到dist下的不同目录
			rollupOptions: {
				output: {
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
				}
			}
		},
		server: {
			host: '0.0.0.0',
			port: 9192,
			https: false,
			proxy: {
				[`${loadEnvByMode(mode, 'VITE_BASE_API')}`]: {
					target: loadEnvByMode(mode, 'VITE_PROXY_URL'),
					changeOrigin: true,
					ws: true,
					rewrite: path => path.replace(new RegExp(`^${loadEnvByMode(mode, 'VITE_BASE_API')}`), '')
				}
			}
		}
	}

	return config
})
