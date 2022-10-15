import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppHome from '../views/AppHome.vue'
import AprendizajeCategorias from '../views/AppAprendizajeCategorias.vue'
import AprendizajeSenias from '../views/AppAprendizajeSenias.vue'
import AprendizajeVideo from '../views/AppAprendizajeVideo.vue'
import ErrorServerView from '../views/ErrorServerView.vue'
import PracticaEscribi from '../views/AppPracticaEscribi.vue'
import PracticaCategorias from '../views/AppPracticaCategorias.vue'
import PracticaAdivina from '../views/AppPracticaAdivina.vue'
import PracticaResultados from '../views/AppPracticaResultados.vue'
import PracticaSigna from '../views/AppPracticaSigna.vue'
import PracticaSigna2 from '../views/AppPracticaSigna2.vue'


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
    path: '/AprendizajeVideo/:categoria/:index',
    name: 'AprendizajeVideo',
    component: AprendizajeVideo,
    props: true
  },
  {
    path: '/ErrorServer',
    name: 'ErrorServer',
    component: ErrorServerView,
    props: true
  },
  {
    path: '/PracticaEscribi/:categoriaVideo/:index',
    name: 'PracticaEscribi',
    component: PracticaEscribi,
    props: true
  },
  {
    path: '/PracticaCategorias',
    name: 'PracticaCategorias',
    component: PracticaCategorias,
    props: true
  },
  {
    path: '/PracticaAdivina/:categoriaVideo/:index',
    name: 'PracticaAdivina',
    component: PracticaAdivina,
    props: true
  },
  {
    path: '/PracticaResultados/:categoriaVideo/',
    name: 'PracticaResultados',
    component: PracticaResultados,
    props: true
  },
  {
    path: '/PracticaSigna/:categoriaVideo/:index',
    name: 'PracticaSigna',
    component: PracticaSigna,
    props: true
  },
  {
    path: '/PracticaSigna2',
    name: 'PracticaSigna2',
    component: PracticaSigna2,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
