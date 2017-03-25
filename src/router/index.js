import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Itens from '@/components/itens/Itens'
import Users from '@/components/users/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/itens',
      name: 'itens',
      component: Itens
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    }
  ]
})
