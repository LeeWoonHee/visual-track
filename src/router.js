import Vue from 'vue'
import Router from 'vue-router'
import {EventBus} from '@/EventBus'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {
      path: '/',
      name: 'intro',
      component: () => import('@/views/pages/intro/index.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/pages/index.vue')
    },
    {
      path: '/portfolios',
      name: 'portfolio',
      component: () => import('@/views/pages/portfolios/index.vue'),
      props: true
    },
    {
      path: '/contacts',
      name: 'contact',
      component: () => import('@/views/pages/contacts/index.vue')
    },
    {
      path: '*',
      redirect: '/error-404'
    }
  ]
})
router.beforeEach((to, from, next) => {
    EventBus.$emit('entrance')
    next()
})
router.afterEach((to, from) => {
})

export default router