import http from '@/request/index'

// 获取验证码
export const getCaptcha = () => http.get('/captcha')

// 登录
export const login = data => http.post('/login', data)

// 获取用户信息
export const getUserInfo = () => http.get('/getUserInfo')

// 获取菜单
export const getRoutes = () => http.get('/getRouters')

// 退出登录
export const logout = () => http.post('/logout')
