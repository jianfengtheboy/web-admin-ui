<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useSettingStore, useTabsStore } from '@/store'

defineOptions({ name: 'Main' })
const settingStore = useSettingStore()
const tabsStore = useTabsStore()
</script>

<template>
	<a-layout class="layout-main w-full h-full overflow-hidden relative">
		<router-view v-slot="{ Component, route }">
			<transition :name="settingStore.transitionName" mode="out-in" appear>
				<keep-alive :include="(tabsStore.cacheList as string[])">
					<component :is="Component" v-if="settingStore.reloadFlag" :key="route.path" />
				</keep-alive>
			</transition>
		</router-view>
	</a-layout>
</template>
