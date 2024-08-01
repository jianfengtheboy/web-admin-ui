<script lang="ts" setup>
import { useSettingStore } from '@/store'
import { useDevice } from '@/hooks'
import Logo from '../components/Logo/index.vue'
import Menu from '../components/Menu/index.vue'

const settingStore = useSettingStore()
const { isDesktop } = useDevice()

const handleCollapse = (isCollapsed: boolean) => {
	settingStore.menuCollapse = isCollapsed
}
</script>

<template>
	<div
		v-if="isDesktop"
		class="layout-sidebar flex flex-col box-border z-50"
		:class="{ 'app-menu-dark': settingStore.menuDark }"
		:style="settingStore.menuDark ? settingStore.themeCSSVar : undefined"
	>
		<Logo :collapsed="settingStore.menuCollapse" />
		<a-layout-sider
			class="layout-menu overflow-hidden"
			collapsible
			breakpoint="xl"
			hide-trigger
			:width="220"
			:collapsed="settingStore.menuCollapse"
			@collapse="handleCollapse"
		>
			<a-scrollbar outer-class="h-full" style="height: 100%; overflow: auto">
				<Menu />
			</a-scrollbar>
		</a-layout-sider>
	</div>
</template>

<style lang="less" scoped>
:deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {
	// Menu菜单组件修改
	.arco-menu-icon {
		margin-right: 0;
	}
	.arco-menu-has-icon {
		padding: 0;
		justify-content: center;
	}
	.arco-menu-title {
		display: none;
	}
}

:deep(.arco-menu-icon) {
	padding: 10px 0;
}

.layout-sidebar {
	border-right: 1px solid var(--color-border-2);
	color: var(--color-text-1);
	background-color: var(--color-bg-1);

	.layout-menu {
		flex: 1;
		background-color: inherit;

		:deep(.arco-layout-sider-children) {
			overflow: hidden;
		}
	}
}
</style>
