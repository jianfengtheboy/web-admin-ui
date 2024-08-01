import type { TableInstance } from '@arco-design/web-vue'
import { Modal, Message } from '@arco-design/web-vue'
import { usePagination } from '@/hooks'

interface Options<T> {
	formatResult?: (data: T[]) => any
	onSuccess?: () => void
	immediate?: boolean
	rowKey?: keyof T
}

type PaginationParams = { page: number; size: number }
type Api<T> = (params: PaginationParams) => Promise<ApiRes<ApiListData<T[]>>>

export default function <T>(api: Api<T>, options?: Options<T>) {
	const { formatResult, onSuccess, immediate, rowKey } = options || {}
	const { pagination, setTotal } = usePagination(() => getTableData())
	const loading = ref(false)
	const tableData = ref<any[]>([])

	const getTableData = async () => {
		try {
			loading.value = true
			const response = await api({ page: pagination.current, size: pagination.pageSize })
			tableData.value = formatResult ? formatResult(response.data.rows) : response.data.rows
			setTotal(response.data.total)
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
		const key = rowKey ?? ('id' as keyof T)
		const arr = tableData.value.filter(i => !(i['disabled' as keyof T] ?? false))
		selectedKeys.value = checked ? arr.map(i => i[key] as string | number) : []
	}

	// 删除
	const handleDelete = async <T>(
		deleteApi: () => Promise<ApiRes<T>>,
		options?: { title?: string; content?: string; successTip?: string; showModal?: boolean }
	): Promise<boolean | undefined> => {
		const onDetele = async () => {
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
			return onDetele()
		}
		Modal.warning({
			title: options?.title || '提示',
			content: options?.content || '是否确认删除？',
			hideCancel: false,
			maskClosable: false,
			onBeforeOk: onDetele
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
