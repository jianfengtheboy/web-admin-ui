import http from '@/request/index'

// 列表
export const getSystemUserList = params => http.get('/system/user', params)

// 新增、编辑
export const saveSystemUser = params => http.post('/system/user/save', params)

// 删除
export const deleteSystemUser = params => http.post('/system/user/delete', params)

// 详情
export const getSystemUserDetail = params => http.get('/system/user/detail', params)
