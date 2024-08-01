import http from '@/request/index'

// 列表数据
export const getSystemMenuList = params => http.get('/system/menu', params)

// 详情
export const getSystemMenuDetail = params => http.get('/system/menu/detail', params)

// 新增、编辑
export const saveSystemMenu = params => http.post('/system/menu/save', params)

// 删除
export const deleteSystemMenu = params => http.post('/system/menu/delete', params)

// 获取角色分配权限菜单树
export const getSystemMenuOptions = () => http.get('/system/menu/options')
