import piniaState from 'pinia-plugin-persistedstate'

// base store
export * from './modules/base/setting'
export * from './modules/base/app'
export * from './modules/base/route'
export * from './modules/base/tabs'

// business store
export * from './modules/business/notice'
export * from './modules/business/dict'

const store = createPinia()
store.use(piniaState)

export default store
