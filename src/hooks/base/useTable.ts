import type { TableData, TableInstance } from '@arco-design/web-vue'
import { Modal, Message } from '@arco-design/web-vue'
import { usePagination } from '@/hooks'

interface Options<T, U> {
	formatResult?: (data: T[]) => U[]
	onSuccess?: () => void
	immediate?: boolean
	rowKey?: keyof T
}

type PaginationParams = { page: number; size: number }
type Api<T> = (params: PaginationParams) => Promise<ApiRes<ApiListData<T[]>>> | Promise<ApiRes<T[]>>

export function useTable<T extends U, U = T>(api: Api<T>, options?: Options<T, U>) {
	const { formatResult, onSuccess, immediate, rowKey } = options || {}
	const { pagination, setTotal } = usePagination(() => getTableData())
	const loading = ref(false)
	const tableData: Ref<U[]> = ref([])

	const getTableData = async () => {
		try {
			loading.value = true
			const response = await api({ page: pagination.current, size: pagination.pageSize })
			const data = !Array.isArray(response.data) ? response.data.rows : response.data
			tableData.value = formatResult ? formatResult(data) : data
			const total = !Array.isArray(response.data) ? response.data.total : data.length
			setTotal(total)
			onSuccess && onSuccess()
		} catch (error) {
			console.log(error)
		} finally {
			loading.value = false
		}
	}

	// 是否立即触发
	const isImmediate = immediate ?? true
	isImmediate && getTableData()

	// 搜索
	const search = () => {
		selectedKeys.value = []
		pagination.onChange(1)
	}

	// 多选
	const selectedKeys = ref<(string | number)[]>([])
	const select: TableInstance['onSelect'] = rowKeys => {
		selectedKeys.value = rowKeys
	}

	// 全选
	const selectAll: TableInstance['onSelectAll'] = checked => {
		const key = rowKey ?? 'id'
		const arr = (tableData.value as TableData[]).filter(i => !(i?.disabled ?? false))
		selectedKeys.value = checked ? arr.map(i => i[key as string]) : []
	}

	// 删除
	const handleDelete = async <T>(
		deleteApi: () => Promise<ApiRes<T>>,
		options?: { title?: string; content?: string; successTip?: string; showModal?: boolean }
	): Promise<boolean | undefined> => {
		const onDelete = async () => {
			try {
				const response = await deleteApi()
				if (response.success) {
					Message.success(options?.successTip || '删除成功！')
					selectedKeys.value = []
					getTableData()
				}
				return response.success
			} catch (error) {
				return false
			}
		}
		// 是否显示对话框
		const flag = options?.showModal ?? true
		if (!flag) {
			return onDelete()
		}
		Modal.warning({
			title: options?.title || '提示',
			content: options?.content || '是否确认删除？',
			hideCancel: false,
			maskClosable: false,
			onBeforeOk: onDelete
		})
	}

	return {
		loading,
		tableData,
		getTableData,
		search,
		pagination,
		selectedKeys,
		select,
		selectAll,
		handleDelete
	}
}
