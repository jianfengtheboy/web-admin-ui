<script lang="ts" setup>
import { useSettingStore } from '@/store'

const settingStore = useSettingStore()

// 重载页面
const loading = ref(false)
const reload = () => {
	if (loading.value) return
	loading.value = true
	settingStore.reloadPage()
	setTimeout(() => {
		loading.value = false
	}, 600)
}
</script>

<template>
	<icon-refresh
		class="reload-icon cursor-pointer"
		:class="{ 'reload-icon--spin': loading }"
		:size="16"
		@click="reload"
	/>
</template>

<style lang="less" scoped>
.reload-icon {
	&--spin {
		animation-name: arco-loading-circle;
		animation-duration: 0.6s;
	}
}
</style>
