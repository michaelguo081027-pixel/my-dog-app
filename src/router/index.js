import Vue from 'vue'
import Router from 'vue-router'
import Splash from "@/views/Splash.vue";
import Home from '@/views/Home.vue'
// import ChooseDog from '@/views/ChooseDog.vue'
import RaiseDog from '@/views/RaiseDog.vue'
import Rules from '@/views/Rules.vue'
import MyDog from '@/views/MyDog.vue'
import DogDetail from '@/views/DogDetail.vue'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      component: Splash
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/dog-test',
      name: 'DogTest',
      component: () => import('@/views/DogTest.vue')
    },
    {
      path: '/choose-dog',
      name: 'ChooseDog',
      component: () => import('@/views/ChooseDog.vue')
    },
    {
      path: '/dog-detail',
      name: 'DogDetail',
      component: DogDetail
    },
    {
      path: '/dog-guide',
      name: 'DogGuide',
      component: () => import('@/views/DogGuide.vue')
    },
    {
      path: '/raise-dog',
      name: 'raise-dog',
      component: RaiseDog
    },
    {
      path: '/rules',
      name: 'rules',
      component: Rules
    },
    {
      path: '/my-dog',
      name: 'MyDog',
      component: MyDog
    },
    {
      path: '/coming-soon',
      name: 'ComingSoon',
      component: () => import('@/views/ComingSoon.vue')
    }
  ]
})
