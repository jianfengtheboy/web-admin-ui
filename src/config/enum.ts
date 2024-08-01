import { enumMng } from '@/utils/enum'

export enum ELang {
	zh = 'zh',
	en = 'en',
}

export const EnumUserState = enumMng([
	{ id: 0, name: '启用' },
	{ id: 1, name: '禁用' },
])

export const EnumStatus = enumMng([
	{ id: '0', name: '失败' },
	{ id: '1', name: '成功' },
])
