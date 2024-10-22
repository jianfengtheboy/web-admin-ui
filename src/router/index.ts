import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { useRouteStore } from '@/store'
import systemRoute from './modules/systemRote'

// 默认布局
const Layout = () => import('@/layout/index.vue')

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/redirect',
		component: Layout,
		meta: {
			hidden: true
		},
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('@/views/common/redirect/index.vue')
			}
		]
	},
	{
		path: '/login',
		component: () => import('@/views/public/login/index.vue'),
		meta: {
			hidden: true
		}
	},
	{
		path: '/',
		name: 'Home',
		component: Layout,
		redirect: '/home',
		meta: {
			hidden: false
		},
		children: [
			{
				path: '/home',
				component: () => import('@/views/main/home/index.vue'),
				name: 'Home',
				meta: {
					title: '首页',
					icon: 'icon-dashboard',
					svgIcon: 'menu-home',
					affix: true,
					hidden: false,
					breadcrumb: false
				}
			},
			...systemRoute
		]
	},
	{
		path: '/403',
		component: () => import('@/views/common/error/403.vue'),
		meta: {
			hidden: true
		}
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/common/error/404.vue'),
		meta: {
			hidden: true
		}
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes,
	scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * @description 重置路由
 * @description 注意：所有动态路由路由必须带有 name 属性，否则可能会不能完全重置干净
 */
export function resetRouter() {
	try {
		const { asyncRoutes } = useRouteStore()
		asyncRoutes.forEach(route => {
			const { name } = route
			if (name) {
				router.hasRoute(name) && router.removeRoute(name)
			}
		})
	} catch (error) {
		// 强制刷新浏览器也行，只是交互体验不是很好
		window.location.reload()
	}
}

export default router
