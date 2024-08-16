import type { MockMethod } from 'vite-plugin-mock'
import type { SelectOptionData } from '@arco-design/web-vue'
import { resultSuccess, resultError, getDelayTime } from '../../_utils'
import { dictData } from '../../data/dict'

export default [
	// 列表数据
	{
		url: '/dev-api/system/dict',
		method: 'get',
		timeout: getDelayTime(),
		response: () => {
			return resultSuccess({
				total: dictData.length,
				rows: dictData
			})
		}
	},
	// 新增
	{
		url: '/dev-api/system/dict/save',
		method: 'post',
		timeout: getDelayTime(),
		response: () => {
			return resultSuccess(true)
		}
	},
	// 删除
	{
		url: '/dev-api/system/dict/delete',
		method: 'post',
		timeout: getDelayTime(),
		response: ({ body }) => {
			const { ids } = body
			return resultSuccess(ids)
		}
	},
	// 详情
	{
		url: '/dev-api/system/dict/detail',
		method: 'get',
		timeout: getDelayTime(),
		response: ({ query }) => {
			const { id } = query
			const obj = dictData.find(i => i.id === id)
			if (obj) {
				return resultSuccess(obj)
			} else {
				return resultError(null, '无法查找数据！', 403)
			}
		}
	},
	// 字典数据列表
	{
		url: '/dev-api/system/dict/dataList',
		method: 'get',
		timeout: getDelayTime(),
		response: ({ query }) => {
			const { code } = query
			const obj = dictData.find(i => i.code === code)
			if (obj) {
				return resultSuccess({
					total: obj.list.length,
					rows: obj.list
				})
			}
		}
	},
	// 字典数据新增
	{
		url: '/dev-api/system/dict/dataSave',
		method: 'post',
		timeout: getDelayTime(),
		response: () => {
			return resultSuccess(true)
		}
	},
	// 字典数据删除
	{
		url: '/dev-api/system/dict/dataDelete',
		method: 'post',
		timeout: getDelayTime(),
		response: ({ body }) => {
			const { ids } = body
			return resultSuccess(ids)
		}
	},
	// 字典数据详情
	{
		url: '/dev-api/system/dict/dataDetail',
		method: 'get',
		timeout: getDelayTime(),
		response: ({ query }) => {
			const { id, code } = query
			const obj = dictData.find(i => i.code === code)
			if (!obj) {
				return resultError(null, '无法查找数据！', 403)
			}
			const item = obj.list.find(i => i.id === id)
			if (!item) {
				return resultError(null, '无法查找数据！', 403)
			}
			return resultSuccess(item)
		}
	},
	// 获取字典数据映射
	{
		url: '/dev-api/system/dictData',
		method: 'get',
		timeout: getDelayTime(),
		response: () => {
			const obj: Record<string, SelectOptionData[]> = {}
			dictData.forEach(i => {
				obj[i.code] = i.list.map(i => {
					const obj: SelectOptionData = { label: i.name, value: i.value }
					if (i.color) {
						obj.tagProps = { color: i.color }
					}
					return obj
				})
			})
			return resultSuccess(obj)
		}
	}
] as MockMethod[]
