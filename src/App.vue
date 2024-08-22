<script setup lang="ts">
import { useSettingStore, useDictStore } from './store'

defineOptions({ name: 'App' })

const settingStore = useSettingStore()
settingStore.initTheme()

const dictStore = useDictStore()
dictStore.getDictData()
</script>

<template>
	<a-config-provider update-at-scroll>
		<router-view />
	</a-config-provider>
</template>
