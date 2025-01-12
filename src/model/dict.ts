export interface IDictItem {
	id: string
	createUserString: string
	createTime: string
	name: string
	code: string
	sort: number
	status: Status
	description: string
}

export type IDictDetailResult = IDictItem

export type IDictDataItem = {
	id: string
	name: string
	value: string | number
	status: Status
}
