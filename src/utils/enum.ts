import { IEnumModel, IEnumResult } from '@/model/enum'

/**
 * 构造枚举字段管理对象
 */
export const enumMng = (data: Array<IEnumModel>): IEnumResult => {
	const result: IEnumResult = {} as IEnumResult
	const ids: Array<string | number> = []
	const names: Array<string | number> = []

	data.forEach(item => {
		result[item.id] = item.name
		ids.push(item.id)
		names.push(item.name)
	})

	result.ids = ids
	result.names = names
	result.origin = data
	result.getColor = id => {
		const row = data.find(item => item.id === id)
		return row ? row.color! : ''
	}
	result.getStatus = (id: string | number) => {
		const row = data.find(item => item.id === id)
		return row ? row.status : undefined
	}
	result.getNamesByIds = ids => {
		const names: Array<string | number> = []
		ids.forEach(id => {
			const row = data.find(item => item.id === id)
			row && names.push(row.name)
		})
		return names
	}
	result.getFormats = (idAlias, nameAlias) =>
		data.map(item => ({
			[idAlias]: item.id,
			[nameAlias]: item.name,
		}))
	result.getFilters = hides => data.filter(item => !hides.includes(item.id))

	return result
}
