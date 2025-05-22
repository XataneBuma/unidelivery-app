<template>

  <div class="supplier-dashboard">
    <div class="dashboard-header">
      <h1>Painel do Fornecedor</h1>
    </div>

    <nav class="supplier-nav">
      <router-link to="/supplier/dashboard" class="nav-link" exact-active-class="active">
        <font-awesome-icon icon="tachometer-alt" /> Dashboard
      </router-link>
      <router-link to="/supplier/menu" class="nav-link" exact-active-class="active">
        <font-awesome-icon icon="utensils" /> Menu
      </router-link>
      <router-link to="/supplier/orders" class="nav-link" exact-active-class="active">
        <font-awesome-icon icon="list" /> Pedidos
      </router-link>
      <router-link to="/supplier/profile" class="nav-link" exact-active-class="active">
        <font-awesome-icon icon="user" /> Perfil
      </router-link>
      <router-link to="/supplier/tickets" class="nav-link" exact-active-class="active">
        <font-awesome-icon icon="life-ring" /> Suporte
      </router-link>
    </nav>
/* Navigation styles */
.supplier-nav {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}
.nav-link.active, .nav-link.router-link-exact-active {
  background: #42b983;
  color: #fff;
}
.nav-link:hover {
  background: #e0f7ef;
  color: #21916b;
}

    <div class="dashboard-grid">
      <div class="stats-card">
        <h3>Pedidos Hoje</h3>
        <p class="stat-value">12</p>
      </div>
      <div class="stats-card">
        <h3>Itens no Menu</h3>
        <p class="stat-value">{{ menuItems.length }}</p>
      </div>
      <div class="stats-card">
        <h3>Avaliação Média</h3>
        <p class="stat-value">4.5</p>
      </div>

      <div class="recent-orders">
        <h2>Pedidos Recentes</h2>
        <div class="orders-list">
          <div v-for="order in recentOrders" :key="order.id" class="order-card">
            <div class="order-header">
              <span class="order-id">#{{ order.id }}</span>
              <span class="order-status" :class="order.status">{{ getStatusText(order.status) }}</span>
            </div>
            <div class="order-details">
              <p>{{ order.items.length }} itens - MZN {{ order.total.toFixed(2) }}</p>
              <p>Entrega: {{ order.deliveryPoint }}</p>
            </div>
            <div class="order-actions">
              <button 
                v-if="order.status === 'preparing'" 
                @click="updateOrderStatus(order.id, 'ready')"
                class="btn-ready"
              >
                Marcar como Pronto
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="notifications">
        <h2>Notificações</h2>
        <div class="notifications-list">
          <div 
            v-for="notification in unreadNotifications" 
            :key="notification.id" 
            class="notification-card"
            :class="{ 'unread': !notification.read }"
            @click="markAsRead(notification.id)"
          >
            <p>{{ notification.message }}</p>
            <small>{{ formatDate(notification.createdAt) }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useSupplierStore } from '@/stores/supplier'

const supplierStore = useSupplierStore()

const menuItems = computed(() => supplierStore.menuItems)
const recentOrders = computed(() => supplierStore.orders.slice(0, 3))
const unreadNotifications = computed(() => 
  supplierStore.notifications.filter(n => !n.read).slice(0, 3)
)

onMounted(async () => {
  await supplierStore.fetchSupplierProfile()
})

function getStatusText(status) {
  const statusMap = {
    'preparing': 'Em preparo',
    'ready': 'Pronto para entrega',
    'delivered': 'Entregue'
  }
  return statusMap[status] || status
}

async function updateOrderStatus(orderId, status) {
  await supplierStore.updateOrderStatus(orderId, status)
}

function markAsRead(notificationId) {
  supplierStore.markNotificationAsRead(notificationId)
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString()
}
</script>

<style scoped>
.supplier-dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.btn-profile {
  padding: 8px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.stats-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0 0;
  color: #42b983;
}

.recent-orders, .notifications {
  grid-column: span 3;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.orders-list, .notifications-list {
  margin-top: 15px;
}

.order-card {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 10px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.order-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.order-status.preparing {
  background-color: #fff3cd;
  color: #856404;
}

.order-status.ready {
  background-color: #d4edda;
  color: #155724;
}

.order-status.delivered {
  background-color: #d1ecf1;
  color: #0c5460;
}

.order-actions {
  margin-top: 10px;
  text-align: right;
}

.btn-ready {
  padding: 6px 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.notification-card {
  padding: 12px;
  border-left: 4px solid #42b983;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: #f8f9fa;
}

.notification-card.unread {
  background-color: #e2f3e9;
  border-left-color: #28a745;
}

.notification-card small {
  color: #6c757d;
  display: block;
  margin-top: 5px;
}
</style>