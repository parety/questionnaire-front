import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import routes from './routers.js'
import bus from './store.js'
import './common/stylus/index.styl'

// 路由
Vue.use(VueRouter)
// ajax
Vue.use(VueResource)

const router = new VueRouter({
  // 启用history模式
  mode: 'history',
  routes
})

// 登录中间件
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (bus.user.username) {
            next()
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})

new Vue({
    el: '#app',
    template: '<App></App>',
    router,
    components: { App }
})
