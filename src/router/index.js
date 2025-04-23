import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Shared/HomeView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Auth/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Auth/RegisterView.vue'),
    meta: { requiresAuth: false }
  },
  // Rotas do Consumidor
  {
    path: '/consumer/dashboard',
    name: 'ConsumerDashboard',
    component: () => import('@/views/Consumer/DashboardView.vue'),
    meta: { requiresAuth: true, role: 'consumer' }
  },
  {
    path: '/consumer/supplier/:id',
    name: 'ConsumerMenu',
    component: () => import('@/views/Consumer/SupplierMenuView.vue'),
    meta: { requiresAuth: true, role: 'consumer' }
  },
  {
    path: '/consumer/checkout',
    name: 'Checkout',
    component: () => import('@/views/Consumer/CheckoutView.vue'),
    meta: { requiresAuth: true, role: 'consumer' }
  },
  {
    path: '/consumer/order-confirmation',
    name: 'OrderConfirmation',
    component: () => import('@/views/Consumer/OrderConfirmation.vue'),
    meta: { requiresAuth: true, role: 'consumer' }
  },
  {
    path: '/consumer/orders/:id',
    name: 'OrderTracking',
    component: () => import('@/views/Consumer/OrderTracking.vue'),
    meta: { requiresAuth: true, role: 'consumer' }
  },
  // Rotas do Fornecedor
  {
    path: '/supplier/dashboard',
    name: 'SupplierDashboard',
    component: () => import('@/views/Supplier/DashboardView.vue'),
    meta: { requiresAuth: true, role: 'supplier' }
  },
  {
    path: '/supplier/layout',
    name: 'SupplierLayout',
    component: () => import('@/views/Supplier/SupplierLayout.vue'),
    meta: { requiresAuth: true, role: 'supplier' }
  },
  {
    path: '/supplier/menu',
    name: 'SupplierMenu',
    component: () => import('@/views/Supplier/MenuView.vue'),
    meta: { requiresAuth: true, role: 'supplier' }
  },
  {
    path: '/supplier/orders',
    name: 'SupplierOrders',
    component: () => import('@/views/Supplier/OrdersView.vue'),
    meta: { requiresAuth: true, role: 'supplier' }
  },
  {
    path: '/supplier/profile',
    name: 'SupplierProfile',
    component: () => import('@/views/Supplier/ProfileView.vue'),
    meta: { requiresAuth: true, role: 'supplier' }
  },
  
  // Rotas do Admin
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/Admin/DashboardView.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import('@/views/Admin/UsersView.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/suppliers',
    name: 'AdminSuppliers',
    component: () => import('@/views/Admin/SuppliersView.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: () => import('@/views/Admin/OrdersView.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/settings',
    name: 'AdminSettings',
    component: () => import('@/views/Admin/SettingsView.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  // Rotas de Suporte
  {
    path: '/support/dashboard',
    name: 'SupportDashboard',
    component: () => import('@/views/Support/DashboardView.vue'),
    meta: { requiresAuth: true, role: 'support' }
  },
  {
    path: '/support/tickets',
    name: 'SupportTickets',
    component: () => import('@/views/Support/TicketsView.vue'),
    meta: { requiresAuth: true, role: 'support' }
  },
  {
    path: '/support/manual-orders',
    name: 'SupportManualOrders',
    component: () => import('@/views/Support/ManualOrdersView.vue'),
    meta: { requiresAuth: true, role: 'support' }
  },
  {
    path: '/support/users',
    name: 'SupportUsers',
    component: () => import('@/views/Support/UsersView.vue'),
    meta: { requiresAuth: true, role: 'support' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/Shared/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  console.log('Autenticado:', authStore.isAuthenticated)
  console.log('Autenticado:', to.meta.role)

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAuth && authStore.isAuthenticated && to.meta.role !== authStore.user.role) {
    next('/home')
  } else {
    next()
  }
})

export default router