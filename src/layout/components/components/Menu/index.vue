<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import type { CSSProperties } from 'vue'
import { useSettingStore, useRouteStore } from '@/store'
import { useDevice } from '@/hooks'
import { isExternal } from '@/utils/validate'
import MenuItem from './components/MenuItem.vue'

const emit = defineEmits<{
	(e: 'menuItemClickAfter'): void
}>()

interface IProps {
	menus?: RouteRecordRaw[]
	menuStyle?: CSSProperties
}

const props = withDefaults(defineProps<IProps>(), {})

const { isDesktop } = useDevice()
const route = useRoute()
const router = useRouter()
const appStore = useSettingStore()
const routeStore = useRouteStore()
const sidebarRoutes = computed(() => (props.menus ? props.menus : routeStore.routes))

// 菜单垂直模式、水平模式
const mode = computed(() => {
	if (!['left', 'mix'].includes(appStore.layout)) {
		return 'horizontal'
	} else {
		return 'vertical'
	}
})

// 是否默认展开选中的菜单
const autoOpenSelected = computed(() => {
	if (!['left', 'mix'].includes(appStore.layout)) {
		return false
	} else {
		return true
	}
})

// 当前页面激活菜单路径，先从路由里面找
const activeMenu = computed(() => {
	const { meta, path } = route
	if (meta?.activeMenu) {
		return [meta.activeMenu]
	}
	return [path]
})

// 菜单项点击事件
const onMenuItemClick = (key: string) => {
	if (isExternal(key)) {
		window.open(key)
		return
	}
	router.push({ path: key })
	emit('menuItemClickAfter')
}

// 折叠状态改变时触发
const onCollapse = (collapsed: boolean) => {
	if (appStore.layout === 'mix') {
		appStore.menuCollapse = collapsed
	}
}
</script>

<template>
	<a-menu
		:mode="mode"
		:selected-keys="activeMenu"
		:auto-open-selected="autoOpenSelected"
		:accordion="appStore.menuAccordion"
		:breakpoint="appStore.layout === 'mix' ? 'xl' : undefined"
		:trigger-props="{ animationName: 'slide-dynamic-origin' }"
		:collapsed="!isDesktop ? false : appStore.menuCollapse"
		:style="menuStyle"
		class="h-full"
		@menu-item-click="onMenuItemClick"
		@collapse="onCollapse"
	>
		<MenuItem v-for="(route, index) in sidebarRoutes" :key="route.path + index" :item="route" />
	</a-menu>
</template>
