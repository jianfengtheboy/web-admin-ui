export interface IDeptItem {
	id: string
	name: string
	sort: number
	status: Status
	createTime: string
	parentId: string
	children?: IDeptItem[]
	description: string
}
