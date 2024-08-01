import piniaState from 'pinia-plugin-persistedstate'

export * from './modules/base/setting'
export * from './modules/base/app'
export * from './modules/base/route'
export * from './modules/base/tabs'

export * from './modules/business/notice'

const store = createPinia()
store.use(piniaState)

export default store
