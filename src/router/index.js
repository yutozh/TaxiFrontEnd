import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import test from '../components/test'
import hello from '../components/HelloWorld'
import sca from '../components/sca'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'test',
      component: test
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/hello',
      name: 'hello',
      component: hello
    },
    {
      path: '/sca',
      name: 'sca',
      component: sca
    }
  ]
})
