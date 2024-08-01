<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import { searchTree } from 'xe-utils'
import { useDevice } from '@/hooks'
import { useSettingStore, useRouteStore } from '@/store'
import { filterTree } from '@/utils/route'
import { isExternal } from '@/utils/validate'
import Logo from './components/components/Logo/index.vue'
import Menu from './components/components/Menu/index.vue'
import FoldBtn from './components/components/FoldBtn/index.vue'
import HeaderRightBar from './components/components/HeaderRightBar/index.vue'
import TabBar from './components/TabBar/index.vue'
import Main from './components/Main/index.vue'

const settingStore = useSettingStore()
const route = useRoute()
const router = useRouter()
const routeStore = useRouteStore()
const { isDesktop } = useDevice()

// 过滤是菜单的路由
const menuRoutes = filterTree(routeStore.routes, i => i.meta?.hidden === false)

// 顶部一级菜单
const topMenus = ref<RouteRecordRaw[]>([])
topMenus.value = JSON.parse(JSON.stringify(menuRoutes))

const getMenuIcon = (item: RouteRecordRaw, key: 'svgIcon' | 'icon') => {
	return item.meta?.[key] || item.children?.[0].meta?.[key]
}

const onMenuItemClick = (key: string) => {
	if (isExternal(key)) {
		window.open(key)
		return
	}
	setTimeout(() => getLeftMenus(key))
	const obj = topMenus.value.find(i => i.path === key)
	if (obj && obj.redirect === 'noRedirect') return
	router.push({ path: key })
}

// 克隆是菜单的路由
const cloneMenuRoutes: RouteRecordRaw[] = JSON.parse(JSON.stringify(menuRoutes))
// 顶部一级菜单选中的
const activeMenu = ref<string[]>([])
// 左侧的菜单
const leftMenus = ref<RouteRecordRaw[]>([])
// 获取左侧菜单
const getLeftMenus = (key: string) => {
	const arr = searchTree(cloneMenuRoutes, i => i.path === key, { children: 'children' })
	const rootPath = arr.length ? arr[0].path : ''
	const obj = cloneMenuRoutes.find(i => i.path === rootPath)
	activeMenu.value = obj ? [obj.path] : ['']
	leftMenus.value = obj ? (obj.children as RouteRecordRaw[]) : []
}

watch(
	() => route.path,
	newPath => {
		nextTick(() => {
			getLeftMenus(newPath)
		})
	},
	{ immediate: true }
)
</script>

<template>
	<div class="layout-mix-container h-full flex items-stretch overflow-hidden">
		<section
			v-if="isDesktop"
			class="layout-mix-left flex flex-col overflow-hidden"
			:class="{ 'app-menu-dark': settingStore.menuDark }"
			:style="settingStore.menuDark ? settingStore.themeCSSVar : undefined"
		>
			<Logo :collapsed="settingStore.menuCollapse" />
			<Menu :menus="leftMenus" :menu-style="{ width: '220px', flex: 1 }" />
		</section>

		<section class="layout-mix-right flex-1 flex flex-col overflow-hidden">
			<header class="header flex items-center justify-between overflow-hidden">
				<section :class="['layout-menu-fold', isDesktop ? 'absolute' : '']">
					<FoldBtn />
				</section>
				<a-menu
					v-if="isDesktop"
					mode="horizontal"
					:selected-keys="activeMenu"
					:auto-open-selected="false"
					:trigger-props="{ animationName: 'slide-dynamic-origin' }"
					@menu-item-click="onMenuItemClick"
				>
					<a-menu-item v-for="item in topMenus" :key="item.path">
						<template #icon>
							<BaseIcon v-if="getMenuIcon(item, 'svgIcon')" :name="getMenuIcon(item, 'svgIcon')" :size="24" />
							<template v-else>
								<component v-if="getMenuIcon(item, 'svgIcon')" :is="getMenuIcon(item, 'icon')" />
							</template>
						</template>
						<span>{{ item.meta?.title || item.children?.[0]?.meta?.title || '' }}</span>
					</a-menu-item>
				</a-menu>
				<HeaderRightBar />
			</header>

			<TabBar />
			<Main />
		</section>
	</div>
</template>

<style lang="less" scoped>
:deep(.arco-menu-pop) {
	white-space: nowrap;
}
:deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {
	.arco-menu-icon {
		margin-right: 0;
		padding: 10px 0;
	}
	.arco-menu-has-icon {
		padding: 0;
		justify-content: center;
	}
	.arco-menu-title {
		display: none;
	}
}

:deep(.arco-menu-horizontal) {
	flex: 1;
	overflow: hidden;
	.arco-menu-inner {
		padding-left: 0;
		padding-bottom: var(--padding);
		.arco-menu-overflow-wrap {
			white-space: nowrap;
		}
		:deep(.svg-icon) {
			display: inline-block;
		}
	}
}

.layout-mix-container {
	.layout-mix-left {
		border-right: 1px solid var(--color-border);
		background-color: var(--color-bg-1);
	}
}

.header {
	padding: 0 var(--padding);
	height: 56px;
	color: var(--color-text-1);
	background-color: var(--color-bg-1);
	border-bottom: 1px solid var(--color-border);
}
</style>
