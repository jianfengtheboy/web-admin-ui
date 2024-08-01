import http from '@/request/index'

// 列表
export const getSystemDeptList = (params?: Object) => http.get('/system/dept', params)

// 新增、编辑
export const saveSystemDept = params => http.post('/system/dept/save', params)

// 删除
export const deleteSystemDept = params => http.post('/system/dept/delete', params)

// 详情
export const getSystemDeptDetail = params => http.get('/system/dept/detail', params)
