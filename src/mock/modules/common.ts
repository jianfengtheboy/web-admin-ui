import type { MockMethod } from 'vite-plugin-mock'
import { filterTree } from '@/utils/route'
import { resultSuccess, resultError } from '../_utils'
import { menus } from '../data/menu'
import { userData } from '../data/user'

export default [
	// 获取验证码
	{
		url: '/dev-api/captcha',
		methods: 'get',
		timeout: 10,
		response: () => {
			const data = {
				image:
					'data:image/png;base64,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',
				uuid: '587e9296-ab8b-4ec1-8434-d61635cb7664'
			}
			return resultSuccess(data)
		}
	},
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
