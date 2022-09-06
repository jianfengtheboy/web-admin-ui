import { defineStore } from 'pinia'
import { IUser } from '@/model/common'

interface IState {
  token: string
  userInfo: IUser
}

export const useAppStore = defineStore('app', {
  state: (): IState => ({
    token: '',
    userInfo: {
      id: 0,
      userName: ''
    }
  }),
  persist: {
    key: 'APP_STORE',
    storage: localStorage,
    paths: ['token', 'userInfo']
  },
  getters: {},
  actions: {}
})
