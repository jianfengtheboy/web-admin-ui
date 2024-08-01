import router from '@/router'
import { Message } from '@arco-design/web-vue'
import { useAppStore, useRouteStore, useNoticeStore } from '@/store'
import { getToken } from '@/utils/auth'
import { isHttp } from '@/utils/validate'

// 免登录白名单
const whiteList = ['/login', '/register']

// 是否已经生成过路由表
let hasRouteFlag = false
export const resetHasRouteFlag = () => {
	hasRouteFlag = false
}

router.beforeEach(async (to, _from, next) => {
	const appStore = useAppStore()
	const noticeStore = useNoticeStore()
	const routeStore = useRouteStore()

	// 判断是否登录
	if (getToken()) {
		if (to.path === '/login') {
			// 如果已经登录，并准备进入 Login 页面，则重定向到主页
			next()
		} else {
			await noticeStore.fetchNotice()
			if (!hasRouteFlag) {
				try {
					await appStore.getInfo()
					const accessRoutes = await routeStore.generateRoutes()
					accessRoutes.forEach(route => {
						if (!isHttp(route.path)) {
							router.addRoute(route)
						}
					})
					hasRouteFlag = true
					// 设置 replace: true, 因此导航将不会留下历史记录
					next({ ...to, replace: true })
				} catch (error: any) {
					// 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
					appStore.resetToken()
					Message.error(error.message || '路由守卫过程发生错误')
					next(`/login?redirect=${to.path}`)
				}
			} else {
				next()
			}
		}
	} else {
		// 如果没有 Token
		if (whiteList.indexOf(to.path) !== -1) {
			// 如果在免登录的白名单中，则直接进入
			next()
		} else {
			// 其他没有访问权限的页面将被重定向到登录页面
			next('/login')
		}
	}
})
