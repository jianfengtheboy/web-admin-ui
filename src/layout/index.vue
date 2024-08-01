<script lang="ts" setup>
import { useSettingStore } from '@/store'
import LayoutDefult from './LayoutDefault.vue'
import LayoutMix from './LayoutMix.vue'

defineOptions({
	name: 'Layout'
})

const settingStore = useSettingStore()
</script>

<template>
	<LayoutMix v-if="settingStore.layout === 'mix'" />
	<LayoutDefult v-else />
</template>
