// 当前登录用户信息
export interface IUserInfo {
	// 用户id
	id: string
	// 用户名
	userName: string
	// 昵称
	nickName: string
	// 头像
	avatar: string
	// 性别  0：未知 1: 男性 2：女性
	gender?: Gender
	// 角色
	roles: string[]
	// 权限
	permissions: string[]
}

export interface IUserItem {
	id: string
	createUserString: string
	createTime: string
	disabled: boolean
	deptId: string
	deptName: string
	username: string
	nickname: string
	gender: Gender
	avatar: string
	email: string
	phone: string
	status: Status
	type: 1 | 2
	description: string
}

export type IUserDetailResult = IUserItem & { roleNames: string }
