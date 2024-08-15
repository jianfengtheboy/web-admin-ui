// 系统菜单类型
export interface IMenuItem {
	activeMenu: string
	alwaysShow: boolean
	breadcrumb: boolean
	children: IMenuItem[]
	component: string
	hidden: boolean
	icon: string
	id: string
	keepAlive: boolean
	parentId: string
	path: string
	permission: string
	redirect: string
	roles: string[]
	showInTabs: boolean
	sort: number
	status: Status
	svgIcon: string
	title: string
	type: 1 | 2
	affix: boolean
}

export interface IMenuOptionsItem {
	id: string
	title: string
	children: IMenuOptionsItem[]
}

export interface IMenuForm {
	type: 1 | 2 | 3
	icon: string
	svgIcon: string
	title: string
	sort: number
	status: Status
	path: string
	component: string
	keepAlive: boolean
	hidden: boolean
	parentId: string
	redirect: string
	breadcrumb: boolean
	showInTabs: boolean
	alwaysShow: boolean
	permission: string
}
