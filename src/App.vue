<script setup lang="ts">
import { useSettingStore } from './store'

defineOptions({ name: 'App' })

const settingStore = useSettingStore()
settingStore.initTheme()
</script>

<template>
	<a-config-provider update-at-scroll>
		<router-view />
	</a-config-provider>
</template>
