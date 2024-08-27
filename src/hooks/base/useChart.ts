import type { EChartsOption } from 'echarts'
import { useSettingStore } from '@/store'

interface IProps {
	(isDark: boolean): EChartsOption
}

export default function useChart(sourceOption: IProps) {
	const settingStore = useSettingStore()
	const isDark = computed(() => settingStore.theme === 'dark')

	const option = computed<EChartsOption>(() => {
		return sourceOption(isDark.value)
	})

	return {
		option
	}
}
