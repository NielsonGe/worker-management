import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/LoginView.vue")
  },
  {
    path: '/project-list',
    name: 'ProjectList',
    component: () => import("@/views/ProjectListView.vue")
  },
  {
    path: '/worker-list',
    name: 'WorkerList',
    component: () => import("@/views/WorkerListView.vue")
  },
  {
    path: '/worker-info',
    name: 'WorkerInfo',
    component: () => import("@/views/WorkerInfoView.vue")
  },
  {
    path: '/worker-leave',
    name: 'WorkerLeave',
    component: () => import("@/views/WorkerLeaveView.vue")
  },
  {
    path: '/main/',
    name: 'Main',
    component: () => import("@/views/MainView.vue"),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import("@/views/HomeView.vue")
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import("@/views/RegisterWorkerView.vue")
      },
      {
        path: 'activity',
        name: 'Activity',
        component: () => import("@/views/ActivityView.vue")
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
