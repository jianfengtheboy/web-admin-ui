<script lang="ts" setup>
import { useSettingStore } from '@/store'
import { useDevice } from '@/hooks'
import Logo from '../Logo/index.vue'
import Menu from '../Menu/index.vue'

const settingStore = useSettingStore()
const { isDesktop } = useDevice()
const visible = ref(false)

const onClick = () => {
	if (isDesktop.value) {
		settingStore.setMenuCollapse(!settingStore.menuCollapse)
	} else {
		visible.value = !visible.value
	}
}
</script>

<template>
	<a-button v-if="isDesktop" size="mini" shape="circle" class="fold-btn-fixed" @click="onClick">
		<template #icon>
			<icon-left v-if="!settingStore.menuCollapse" :stroke-width="4" />
			<icon-right v-else :stroke-width="4" />
		</template>
	</a-button>
	<a-button v-if="!isDesktop" size="mini" class="fold-btn" @click="onClick">
		<template #icon>
			<icon-menu-fold v-if="!settingStore.menuCollapse" :size="18" :stroke-width="3" />
			<icon-menu-unfold v-else :size="18" :stroke-width="3" />
		</template>
	</a-button>

	<div
		class="layout-drawer"
		:class="{ 'app-menu-dark': settingStore.menuDark }"
		:style="settingStore.menuDark ? settingStore.themeCSSVar : undefined"
	>
		<a-drawer
			v-model:visible="visible"
			placement="left"
			:header="false"
			:footer="false"
			:render-to-body="false"
			:drawer-style="{
				'border-right': '1px solid var(--color-border-2)',
				'box-sizing': 'border-box',
				'background-color': 'var(--color-bg-1)'
			}"
		>
			<Logo :collapsed="false" />
			<Menu class="menu flex-1 overflow-hidden w-full" @menu-item-click-after="visible = false" />
		</a-drawer>
	</div>
</template>

<style lang="less" scoped>
.fold-btn {
	border: none !important;
	background: var(--color-secondary-hover) !important;
	flex-shrink: 0;

	&:hover {
		background: var(--color-secondary-hover);
	}
}

.fold-btn-fixed {
	position: absolute;
	top: 240px;
	right: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--color-text-2) !important;
	background-color: var(--color-bg-5) !important;
	border: 1px solid var(--color-fill-3);
	box-shadow: 0 4px 10px #0000001a;
	transition: all 0.15s;
	z-index: 99;
}

.layout-drawer {
	.menu {
		background-color: inherit;
	}

	:deep(.arco-drawer-body) {
		padding: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
}
</style>
