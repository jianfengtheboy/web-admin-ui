import type { SelectOptionData } from '@arco-design/web-vue'
import { getSystemDictData } from '@/apis/modules/system/dict'

const storeSetup = () => {
	const dictData = ref<Record<string, SelectOptionData[]>>({})

	const getDictData = async () => {
		try {
			const response = await getSystemDictData()
			if (response && response.code === 200) {
				dictData.value = response.data || {}
			}
		} catch (error) {
			console.log(error)
		}
	}

	return {
		dictData,
		getDictData
	}
}

export const useDictStore = defineStore('dict', storeSetup, { persist: false })
