<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { useSettingStore } from '@/store'

defineOptions({ name: 'BaseThemeButton' })

const settingStore = useSettingStore()

const isDark = useDark({
	selector: 'body',
	attribute: 'arco-theme',
	valueDark: 'dark',
	valueLight: 'light',
	storageKey: 'arco-theme',
	onChanged(dark: boolean) {
		settingStore.toggleTheme(dark)
	},
})

const toggleTheme = useToggle(isDark)

const onToggleThemeAction = () => {
	toggleTheme()
}
</script>

<template>
	<a-button size="mini" @click="onToggleThemeAction">
		<template #icon>
			<icon-sun-fill :size="18" v-if="settingStore.theme === 'light'" />
			<icon-moon-fill :size="18" v-else />
		</template>
	</a-button>
</template>
