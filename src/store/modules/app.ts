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
  getters: {},
  actions: {},
  persist: {
    enabled: true
  }
})
