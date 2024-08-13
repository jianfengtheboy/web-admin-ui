<script lang="ts" setup>
import type { RouteLocationMatched } from 'vue-router'
import { findTree } from 'xe-utils'
import { useRouteStore } from '@/store'

const route = useRoute()
const router = useRouter()
const { routes } = useRouteStore()

let home: RouteLocationMatched | null = null
const getHome = () => {
	if (!home) {
		const cloneRoutes = JSON.parse(JSON.stringify(routes)) as RouteLocationMatched[]
		const obj = findTree(cloneRoutes, i => i.path === '/home')
		home = obj.item
	}
}

const breadcrumbList = ref<RouteLocationMatched[]>([])
function getBreadcrumbList() {
	getHome()
	const cloneRoutes = JSON.parse(JSON.stringify(routes)) as RouteLocationMatched[]
	const obj = findTree(cloneRoutes, i => i.path === route.path)
	// 获取当前节点的所有上级节点集合，包含当前节点
	const arr = obj ? obj.nodes.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false) : []
	if (home) {
		breadcrumbList.value = [home, ...arr]
	}
}
getBreadcrumbList()

watchEffect(() => {
	if (route.path.startsWith('/redirect/')) return
	getBreadcrumbList()
})

// 路由跳转
const handleLink = (item: RouteLocationMatched) => {
	const { redirect, path } = item
	if (redirect) {
		return router.push(redirect as string)
	}
	router.push(path)
}
</script>

<template>
	<a-breadcrumb>
		<a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
			<span
				v-if="item.redirect === 'noRedirect' || item.redirect === '' || index === breadcrumbList.length - 1"
				class="overflow-hidden whitespace-nowrap text-ellipsis"
			>
				{{ item.meta.title }}
			</span>
			<span
				v-else
				class="breadcrumb-item-title overflow-hidden whitespace-nowrap text-ellipsis"
				@click="handleLink(item)"
			>
				{{ item.meta.title }}
			</span>
		</a-breadcrumb-item>
	</a-breadcrumb>
</template>

<style lang="less" scoped>
.breadcrumb-item-title {
	transition: all 0.3s;
	cursor: pointer;
	&:hover {
		color: var(--color-theme);
		font-weight: 600;
	}
}
</style>
