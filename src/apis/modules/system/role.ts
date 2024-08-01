import http from '@/request/index'

// 列表
export const getSystemRoleList = (params?: Object) => http.get('/system/role', params)

// 新增、编辑
export const saveSystemRole = params => http.post('/system/role/save', params)

// 删除
export const deleteSystemRole = params => http.post('/system/role/delete', params)

// 详情
export const getSystemRoleDetail = params => http.get('/system/role/detail', params)

// 获取角色权限
export const getSystemRoleMenuIds = params => http.get('/system/role/menuIds', params)

// 保存权限分配
export const saveSystemRoleMenuIds = params => http.post('/system/role/menuIds/save', params)
