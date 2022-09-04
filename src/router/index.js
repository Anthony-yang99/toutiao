import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login/Login-View.vue'
// import Layout from '@/views/layout/Layout-View.vue'
// import Home from '@/views/home/Home-View.vue'
// import User from '@/views/user/User-View.vue'
// import Search from '@/views/search/Search-View.vue'
// import SearchResult from '@/views/search/searchResult.vue'
// import ArticleDetail from '@/views/ArticleDetail/Article-View.vue'
// import UserEdit from '@/views/user/UserEdit.vue'
// import Chat from '@/views/chat/Chat-View.vue'
import { getToken } from '@/utils/token.js'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/layout/home' },
  { path: '/login', component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login-View.vue') },
  {
    path: '/layout',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/layout/Layout-View.vue'),
    children: [
      { path: 'home', component: () => import(/* webpackChunkName: "home" */ '@/views/home/Home-View.vue') },
      { path: 'user', component: () => import(/* webpackChunkName: "user" */ '@/views/user/User-View.vue') }
    ]
  },
  { path: '/search', component: () => import(/* webpackChunkName: "search" */ '@/views/search/Search-View.vue') },
  { path: '/search_result/:kw', component: () => import(/* webpackChunkName: "search_result" */ '@/views/search/searchResult.vue') },
  { path: '/detail', component: () => import(/* webpackChunkName: "detail" */ '@/views/ArticleDetail/Article-View.vue') },
  { path: '/useredit', component: () => import(/* webpackChunkName: "useredit" */ '@/views/user/UserEdit.vue') },
  { path: '/chat', component: () => import(/* webpackChunkName: "chat" */ '@/views/chat/Chat-View.vue') }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token?.length > 0 && to.path === '/login') {
    next('/layout/home')
  } else {
    next()
  }
})

export default router
