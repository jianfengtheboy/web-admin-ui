export interface IDeptItem {
	id: string
	name: string
	sort: number
	status: 0 | 1
	createTime: string
	parentId: string
	children?: IDeptItem[]
	description: string
}
