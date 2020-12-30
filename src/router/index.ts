import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const baseurl = "/realnameh5";

const routes: Array<RouteRecordRaw> = [
  {
    path: baseurl + '/',
    redirect: baseurl + '/login'
  },
  {
    path: baseurl + '/login',
    name: 'Login',
    component: () => import("@/views/LoginView.vue"),
    meta: {
      title: '登录'
    }
  },
  {
    path: baseurl + '/project-list',
    name: 'ProjectList',
    component: () =>  import("@/views/ProjectListView.vue") ,
    meta: {
      title: '项目列表'
    }
  },
  {
    path: baseurl + '/worker-list',
    name: 'WorkerList',
    component: () => import("@/views/WorkerListView.vue"),
    meta: {
      title: '工人管理'
    }
  },
  {
    path: baseurl + '/worker-info',
    name: 'WorkerInfo',
    component: () => import("@/views/WorkerInfoView.vue"),
    meta: {
      title: '人员信息'
    }
  },
  {
    path: baseurl + '/worker-leave',
    name: 'WorkerLeave',
    component: () => import("@/views/WorkerLeaveView.vue"),
    meta: {
      title: '人员信息'
    }
  },
  {
    path: baseurl + '/main/',
    name: 'Main',
    component: () => import("@/views/MainView.vue"),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import("@/views/HomeView.vue"),
        meta: {
          title: '项目首页'
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import("@/views/RegisterWorkerView.vue"),
        meta: {
          title: '人员登记'
        }
      },
      {
        path: 'activity',
        name: 'Activity',
        component: () => import("@/views/ActivityView.vue"),
        meta: {
          title: 'Activity View'
        }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import("@/components/RightMenu.vue"),
        meta: {
          title: 'Menu View'
        }

      }
     
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: baseurl + '/login'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
