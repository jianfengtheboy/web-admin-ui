import type { IRoleItem } from '@/model/role'

export default function useRole() {
	const loading = ref(false)
	const roleList = ref<IRoleItem[]>([])
	const total = ref(0)
	const getRoleList = async () => {
		try {
			loading.value = true
			const response = await window.$apis.system.getSystemRoleList({ pageNum: 1, pageSize: 99 })
			if (response && response.code === 200) {
				roleList.value = response.data.rows.filter(i => i.status === 1)
				total.value = response.data.total
			}
		} finally {
			loading.value = false
		}
	}
	return {
		roleList,
		getRoleList,
		loading,
		total
	}
}
