import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue')
      },
      {
        path: 'confirm',
        component: () => import('../views/ConfirmView.vue')
      },
      {
        path: 'complete',
        component: () => import('../views/CompleteView.vue')
      },
      {
        path: 'about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: 'favorite',
        component: () => import('../views/FavoriteView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('../views/ProductView.vue')
      }
    ]
  },
  // 登入頁面
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  // 後台
  {
    path: '/admin',
    component: () => import('../views/Dashboard/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Dashboard/ProductsView.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/Dashboard/OrdersView.vue')
      },
      {
        path: 'image',
        component: () => import('../views/Dashboard/ImageView.vue')
      }
    ]
  },
  // 404頁面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
