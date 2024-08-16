import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError, getDelayTime } from '../../_utils'
import { mapTree, findTree } from 'xe-utils'
import { menus as menuData } from '../../data/menu'

export default [
	// 列表数据
	{
		url: '/dev-api/system/menu',
		method: 'get',
		timeout: getDelayTime(),
		response: () => {
			return resultSuccess(mapTree(JSON.parse(JSON.stringify(menuData)), i => ({ ...i })))
		}
	},
	// 详情
	{
		url: '/dev-api/system/menu/detail',
		method: 'get',
		timeout: getDelayTime(),
		response: ({ query }) => {
			const { id } = query
			const obj = findTree(menuData, i => i.id === id)
			if (obj.item) {
				return resultSuccess(obj.item)
			} else {
				return resultError(null, '没有该部门', 400)
			}
		}
	},
	// 新增、编辑
	{
		url: '/dev-api/system/menu/save',
		method: 'post',
		timeout: getDelayTime(),
		response: () => {
			return resultSuccess(true)
		}
	},
	// 删除
	{
		url: '/dev-api/system/menu/delete',
		method: 'post',
		timeout: getDelayTime(),
		response: () => {
			return resultSuccess(true)
		}
	},
	// 获取角色分配权限菜单树
	{
		url: '/dev-api/system/menu/options',
		method: 'get',
		timeout: getDelayTime(),
		response: () => {
			const data = mapTree(JSON.parse(JSON.stringify(menuData)), i => ({
				id: i.id,
				title: i.title,
				children: i.children
			}))
			return resultSuccess(data)
		}
	}
] as MockMethod[]
