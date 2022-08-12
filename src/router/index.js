import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppHome from '../views/AppHome.vue'
import AprendizajeCategorias from '../views/AppAprendizajeCategorias.vue'
import AprendizajeSenias from '../views/AppAprendizajeSenias.vue'
import AprendizajeVideo from '../views/AppAprendizajeVideo.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/AppHome',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/AprendizajeCategorias',
    name: 'AprendizajeCategorias',
    component: AprendizajeCategorias
  },
  {
    path: '/AprendizajeSenias/:categoria',
    name: 'AprendizajeSenias',
    component: AprendizajeSenias,
    props: true
  },
  {
    path: '/AprendizajeVideo/:index',
    name: 'AprendizajeVideo',
    component: AprendizajeVideo,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
