/** 接口返回数据格式 */
interface ApiRes<T> {
	code: number
	message: string
	data: T
	success: boolean
}

/** 接口返回的列表数据 */
interface ApiListData<T> {
	total: number
	rows: T
	[propName: string]: unknown
}
