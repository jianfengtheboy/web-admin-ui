import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError, getDelayTime } from '../../_utils'
import { userData } from '../../data/user'

export default [
	// 列表
	{
		url: '/dev-api/system/user',
		method: 'get',
		timeout: getDelayTime(),
		response: () => {
			return resultSuccess({
				total: userData.length,
				rows: userData
			})
		}
	},
	// 新增、编辑
	{
		url: '/dev-api/system/user/save',
		method: 'post',
		timeout: getDelayTime(),
		response: () => {
			return resultSuccess(true)
		}
	},
	// 删除
	{
		url: '/dev-api/system/user/delete',
		method: 'post',
		timeout: getDelayTime(),
		response: ({ body }) => {
			const { ids } = body
			return resultSuccess(ids)
		}
	},
	// 详情
	{
		url: '/dev-api/system/user/detail',
		method: 'get',
		timeout: getDelayTime(),
		response: ({ query }) => {
			const { id } = query
			const index = userData.findIndex(i => i.id === id)
			if (index >= 0) {
				if (userData[index].id === '01') {
					return resultSuccess(userData[index])
				}
				if (userData[index].id === '02') {
					return resultSuccess(userData[index])
				}
			} else {
				return resultError(null, '没有该用户', 400)
			}
		}
	}
] as MockMethod[]
