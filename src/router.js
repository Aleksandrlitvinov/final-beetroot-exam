
import Vue from 'vue'
import VueRouter from 'vue-router'
import BoardComponent from "./components/BoardComponent";

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/main',
      name: 'main',
      meta: {layout: 'main'},
      component: ()=> import('./components/Main')
    },
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'entry'},
      component: ()=> import('./components/auth/Login')
    },
    {
      path: '/register',
      name: 'registration',
      meta: {layout: 'entry'},
      component: ()=> import('./components/auth/Registration')
    },
  ]
})