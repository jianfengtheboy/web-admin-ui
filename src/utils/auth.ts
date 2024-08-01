import { AppStoreName } from '@/config/domain'

const getToken = () => localStorage.getItem(`${AppStoreName}_TOKEN`)

const setToken = (token: string) => localStorage.setItem(`${AppStoreName}_TOKEN`, token)

const clearToken = () => localStorage.removeItem(`${AppStoreName}_TOKEN`)

const isLogin = () => !!localStorage.getItem(`${AppStoreName}_TOKEN`)

export { getToken, setToken, clearToken, isLogin }
