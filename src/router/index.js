import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  
]

export const lastRoute = [
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
  routes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
