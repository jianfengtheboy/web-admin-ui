import { mapTree } from 'xe-utils'
import type { IDeptItem } from '@/model/dept'

export default function useDept(options?: { onSuccess?: () => void }) {
	const loading = ref(false)
	const deptList = ref<IDeptItem[]>([])

	const getDeptList = async () => {
		try {
			loading.value = true
			const response = await window.$apis.system.getSystemDeptList()
			if (response && response.code === 200) {
				deptList.value = mapTree(response.data, i => {
					if (i.children?.length) {
						i.children = i.children.filter(i => i.status === 1)
					}
					return i
				})
				options?.onSuccess && options.onSuccess()
			}
		} catch (error) {
			console.log(error)
		} finally {
			loading.value = false
		}
	}

	return {
		loading,
		deptList,
		getDeptList
	}
}
