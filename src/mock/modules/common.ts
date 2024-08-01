import type { MockMethod } from 'vite-plugin-mock'
import { filterTree } from '@/utils/route'
import { resultSuccess, resultError } from '../_utils'
import { menus } from '../data/menu'
import { userData } from '../data/user'

export default [
	// 登录
	{
		url: '/dev-api/login',
		method: 'post',
		timeout: 300,
		response: ({ body }) => {
			const { username, password, code, uuid } = body
			if (!username) {
				return resultError(null, '用户名不能为空')
			}
			if (!password) {
				return resultError(null, '密码不能为空')
			}
			if (!code || !uuid) {
				return resultError(null, '验证码不能为空')
			}
			if (username === 'admin' && password === '123456') {
				return resultSuccess({
					token: 'TOKEN-admin'
				})
			}
			if (username === 'user' && password === '123456') {
				return resultSuccess({
					token: 'TOKEN-user'
				})
			}
			return resultError(null, '账号或者密码错误')
		}
	},
	// 退出登录
	{
		url: '/dev-api/logout',
		method: 'post',
		timeout: 300,
		response: () => {
			return resultSuccess(null)
		}
	},
	// 获取用户信息
	{
		url: '/dev-api/getUserInfo',
		method: 'get',
		timeout: 100,
		response: ({ headers }) => {
			const token = headers.authorization
			if (token && ['TOKEN-admin', 'TOKEN-user'].includes(token)) {
				const userList = userData.map(i => ({
					id: i.id,
					nickname: i.nickname,
					avatar: i.avatar,
					roles: i.roleIds,
					permissions: i.permissions
				}))
				const isAdmin = token === 'TOKEN-admin'
				return resultSuccess(isAdmin ? userList[0] : userList[1])
			} else {
				return resultError(null, 'token失效', 401)
			}
		}
	},
	// 获取菜单
	{
		url: '/dev-api/getRouters',
		method: 'get',
		timeout: 300,
		response: ({ headers }) => {
			const token = headers.authorization
			if (token && ['TOKEN-admin', 'TOKEN-user'].includes(token)) {
				const roles = token === 'TOKEN-admin' ? ['role_admin'] : ['role_user']
				// 如果是超级管理员角色
				if (roles.includes('role_admin')) {
					const data = filterTree(JSON.parse(JSON.stringify(menus)), (i: any) => [1, 2].includes(i.type))
					return resultSuccess(data)
				}
				// 如果是普通用户角色
				if (roles.includes('role_user')) {
					const data = filterTree(JSON.parse(JSON.stringify(menus)), (i: any) => {
						return i.path !== '/system' && i.roles.some(i => roles.includes(i)) && [1, 2].includes(i.type)
					})
					return resultSuccess(data)
				}
				return resultSuccess([])
			} else {
				return resultError(null, 'token失效', 401)
			}
		}
	}
] as MockMethod[]
