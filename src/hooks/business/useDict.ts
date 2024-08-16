import { useDictStore } from '@/store'

// 字典模块
export default function useDict(option: { code: string }) {
	const dictStore = useDictStore()

	const data = computed(() => {
		return dictStore.dictData[option.code]
	})

	return { data }
}
