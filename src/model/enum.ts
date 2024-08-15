export interface IEnumModel {
	id: string | number
	name: string | number
	color?: string
	status?: ThemeStatus
	[key: string]: any
	[key: number]: any
}

export interface IEnumResult {
	ids: Array<IEnumModel['id']>
	names: Array<IEnumModel['name']>
	origin: Array<IEnumModel>
	[key: string]: any
	[key: number]: any
	getColor: (id: string | number) => string
	getStatus: (id: string | number) => ThemeStatus | undefined
	getNamesByIds: (ids: Array<string | number>) => Array<string | number>
	getFormats: (idAlias: string, nameAlias: string) => any[]
	getFilters: (hides: Array<string | number>) => IEnumModel[]
}
