import { useAppStore } from '@/store'

// 验证用户是否具备某权限
const hasPerm = (value: string) => {
	const all = '*:*:*'
	const permissions = useAppStore().permissions
	return value ? permissions.some(v => all === v || v === value) : false
}

// 验证用户是否含有指定权限，只需包含其中一个
const hasPermOr = (value: string[]) => {
	return value.some(i => hasPerm(i))
}

// 验证用户是否含有指定权限，必须全部拥有
const hasPermAnd = (value: string[]) => {
	return value.every(i => hasPerm(i))
}

// 验证用户是否具备某角色
const hasRole = (role: string) => {
	const all = 'role_admin'
	const roles = useAppStore().roles
	return role ? roles.some(v => all === v || v === role) : false
}

// 验证用户是否含有指定角色，只需包含其中一个
const hasRoleOr = (roles: string[]) => {
	return roles.some(i => hasRole(i))
}

// 验证用户是否含有指定角色，必须全部拥有
const hasRoleAnd = (roles: string[]) => {
	return roles.every(i => hasRole(i))
}

export default {
	hasPerm,
	hasPermOr,
	hasPermAnd,
	hasRole,
	hasRoleOr,
	hasRoleAnd
}
