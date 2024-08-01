import type { MockMethod } from 'vite-plugin-mock'
import { findTree } from 'xe-utils'
import { resultSuccess, resultError } from '../../_utils'
import { deptData } from '../../data/dept'

export default [
	// 列表
	{
		url: '/dev-api/system/dept',
		method: 'get',
		timeout: 100,
		response: () => {
			return resultSuccess(deptData)
		}
	},
	// 新增、编辑
	{
		url: '/dev-api/system/dept/save',
		method: 'post',
		timeout: 350,
		response: () => {
			return resultSuccess(true)
		}
	},
	// 删除
	{
		url: '/dev-api/system/dept/delete',
		method: 'post',
		timeout: 300,
		response: () => {
			return resultSuccess(true)
		}
	},
	// 详情
	{
		url: '/dev-api/system/dept/detail',
		method: 'get',
		timeout: 100,
		response: ({ query }) => {
			const { id } = query
			const obj = findTree(deptData, i => i.id === id)
			if (obj.item) {
				return resultSuccess(obj.item)
			} else {
				return resultError(null, '没有该部门', 400)
			}
		}
	}
] as MockMethod[]
