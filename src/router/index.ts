import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: () => import("@/views/LoginView.vue"),
  //   meta: {
  //     title: '登录'
  //   }
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/LoginView.vue"),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/project-list',
    name: 'ProjectList',
    component: () =>  import("@/views/ProjectListView.vue") ,
    meta: {
      title: '项目列表'
    }
  },
  {
    path: '/worker-list',
    name: 'WorkerList',
    component: () => import("@/views/WorkerListView.vue"),
    meta: {
      title: '工人管理'
    }
  },
  {
    path: '/worker-info',
    name: 'WorkerInfo',
    component: () => import("@/views/WorkerInfoView.vue"),
    meta: {
      title: '人员信息'
    }
  },
  {
    path: '/worker-leave',
    name: 'WorkerLeave',
    component: () => import("@/views/WorkerLeaveView.vue"),
    meta: {
      title: '人员信息'
    }
  },
  {
    path: '/team-list',
    name: 'TeamList',
    component: () => import("@/views/TeamListView.vue"),
    meta: {
      title: '班组列表'
    }
  },
  {
    path: '/company-list',
    name: 'CompanyList',
    component: () => import("@/views/CompanyListView.vue"),
    meta: {
      title: '公司列表'
    }
  },
  {
    path: '/register-team',
    name: 'RegisterTeam',
    component: () => import("@/views/RegisterTeamView.vue"),
    meta: {
      title: '劳工队伍登记'
    }
  },
  {
    path: '/team-info',
    name: 'TeamInfo',
    component: () => import("@/views/TeamInfoView.vue"),
    meta: {
      title: '劳工队伍信息'
    }
  },
  {
    path: '/main/',
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
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
