import type { MockMethod } from 'vite-plugin-mock'
import { eachTree } from 'xe-utils'
import { resultSuccess, resultError } from '../../_utils'
import { roleData } from '../../data/role'
import { menus } from '../../data/menu'

export default [
	// 列表
	{
		url: '/dev-api/system/role',
		method: 'get',
		timeout: 100,
		response: () => {
			return resultSuccess({
				total: roleData.length,
				rows: roleData
			})
		}
	},
	// 新增、编辑
	{
		url: '/dev-api/system/role/save',
		method: 'post',
		timeout: 350,
		response: () => {
			return resultSuccess(true)
		}
	},
	// 删除
	{
		url: '/dev-api/system/role/delete',
		method: 'post',
		timeout: 350,
		response: ({ body }) => {
			const { ids } = body
			return resultSuccess(ids)
		}
	},
	// 详情
	{
		url: '/dev-api/system/role/detail',
		method: 'get',
		timeout: 100,
		response: ({ query }) => {
			const { id } = query
			const index = roleData.findIndex(i => i.id === id)
			if (index >= 0) {
				return resultSuccess(roleData[index])
			} else {
				return resultError(null, '没有该角色', 400)
			}
		}
	},
	// 获取角色权限
	{
		url: '/dev-api/system/role/menuIds',
		method: 'get',
		timeout: 350,
		response: ({ query }) => {
			const { role } = query
			if (role === 'role_user') {
				const arr: string[] = []
				eachTree(JSON.parse(JSON.stringify(menus)), i => {
					if (!['08101', '0810204', '0810205', '0810206'].includes(i.id) && !i.path.startsWith('/system')) {
						arr.push(i.id)
					}
				})
				return resultSuccess(arr)
			}
			if (role === 'role_user2') {
				return resultSuccess([])
			}
		}
	},
	// 保存权限分配
	{
		url: '/dev-api/system/role/menuIds/save',
		method: 'post',
		timeout: 120,
		response: () => {
			return resultSuccess(true)
		}
	}
] as MockMethod[]
