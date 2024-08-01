import { resetRouter } from '@/router'
import { setToken, clearToken } from '@/utils/auth'
import { resetHasRouteFlag } from '@/router/permission'
import request from '@/request'
import { AppStoreName } from '@/config/domain'
import { IUserInfo } from '@/model/user'

interface IState {
	// token
	token: string
	// 用户信息
	userInfo: Pick<IUserInfo, 'id' | 'userName' | 'nickName' | 'avatar' | 'gender'>
	// 角色
	roles: string[]
	// 权限
	permissions: string[]
}

export const useAppStore = defineStore('app', {
	state: (): IState => ({
		token: '',
		userInfo: {
			id: '',
			userName: '',
			nickName: '',
			avatar: '',
			gender: 0
		},
		roles: [],
		permissions: []
	}),
	persist: {
		key: `${AppStoreName}_AUTH`,
		paths: ['userInfo', 'roles', 'permissions'],
		storage: localStorage
	},
	actions: {
		// 重置token
		resetToken() {
			this.token = ''
			clearToken()
			resetHasRouteFlag()
		},
		// 登录
		async login(params: any) {
			const response = await window.$apis.common.login(params)
			if (response.code === 200) {
				this.token = response.data.token
				setToken(response.data.token)
				request.setHeader({
					Authorization: response.data.token
				})
			}
		},
		// 退出
		async logout() {
			try {
				await window.$apis.common.logout()
				this.userInfo = {} as any
				this.roles = []
				this.permissions = []
				this.resetToken()
				resetRouter()
				request.setHeader({
					Authorization: ''
				})
				return true
			} catch (error) {
				return false
			}
		},
		// 获取用户信息
		async getInfo() {
			const response = await window.$apis.common.getUserInfo()
			if (response.code === 200) {
				this.userInfo = {
					id: response.data.id,
					userName: response.data.userName,
					nickName: response.data.nickName,
					avatar: response.data.avatar,
					gender: response.data.gender
				}
				if (response.data.roles && response.data.roles.length > 0) {
					this.roles = response.data.roles
					this.permissions = response.data.permissions
				}
			}
		}
	}
})
