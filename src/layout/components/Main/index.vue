<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useSettingStore, useTabsStore } from '@/store'

defineOptions({ name: 'Main' })
const settingStore = useSettingStore()
const tabsStore = useTabsStore()

// 过渡动画
const transitionName = computed(() => {
	return function (route: RouteLocationNormalizedLoaded) {
		if (route?.matched?.[1]?.meta?.animation === false) {
			return ''
		}
		return settingStore.transitionName
	}
})
</script>

<template>
	<a-layout class="layout-main w-full h-full overflow-hidden relative">
		<router-view v-slot="{ Component, route }">
			<transition :name="transitionName(route)" mode="out-in" appear>
				<keep-alive :include="(tabsStore.cacheList as string[])">
					<component :is="Component" :key="route.matched?.[1]?.path" />
				</keep-alive>
			</transition>
		</router-view>
	</a-layout>
</template>
