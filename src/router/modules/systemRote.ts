import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw[] = [
	{
		path: '/userProfile',
		component: () => import('@/views/main/system/userProfile/index.vue'),
		name: 'UserProfile',
		meta: {
			title: '个人中心',
			hidden: true
		}
	}
]

export default route
