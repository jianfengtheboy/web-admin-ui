import http from '@/request/index'

// 列表数据
export const getSystemDictList = params => http.get('/system/dict', params)

// 新增、编辑
export const saveSystemDict = params => http.post('/system/dict/save', params)

// 删除
export const deleteSystemDict = params => http.post('/system/dict/delete', params)

// 详情
export const getSystemDictDetail = params => http.get('/system/dict/detail', params)

// 字典数据列表
export const getSystemDictDataList = params => http.get('/system/dict/dataList', params)

// 字典数据新增、编辑
export const saveSystemDictData = params => http.post('/system/dict/dataSave', params)

// 字典数据删除
export const deleteSystemDictData = params => http.post('/system/dict/dataDelete', params)

// 字典数据详情
export const getSystemDictDataDetail = params => http.get('/system/dict/dataDetail', params)

// 获取字典数据映射
export const getSystemDictData = () => http.get('/system/dictData')
