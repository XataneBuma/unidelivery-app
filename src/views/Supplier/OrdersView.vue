<template>
    <div class="orders-management">
      <h1>Gestao de Pedidos</h1>
      
      <div class="orders-filters">
        <div class="filter-group">
          <label>Status:</label>
          <select v-model="statusFilter">
            <option value="all">Todos</option>
            <option value="preparing">Em preparo</option>
            <option value="ready">Prontos</option>
            <option value="delivered">Entregues</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Data:</label>
          <input v-model="dateFilter" type="date">
        </div>
      </div>
  
      <div class="orders-list">
        <div v-for="order in filteredOrders" :key="order.id" class="order-card">
          <div class="order-header">
            <div class="order-id">Pedido #{{ order.id }}</div>
            <div class="order-status" :class="order.status">{{ getStatusText(order.status) }}</div>
            <div class="order-date">{{ formatDate(order.createdAt) }}</div>
          </div>
          
          <div class="order-customer">
            <font-awesome-icon icon="user" />
            {{ order.customer }}
          </div>
          
          <div class="order-items">
            <div v-for="item in order.items" :key="item.id" class="order-item">
              <span class="item-quantity">{{ item.quantity }}x</span>
              <span class="item-name">{{ item.name }}</span>
              <span class="item-price">MZN {{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          
          <div class="order-summary">
            <div class="delivery-point">
              <font-awesome-icon icon="map-marker-alt" />
              {{ order.deliveryPoint }}
            </div>
            <div class="order-total">
              Total: MZN {{ order.total.toFixed(2) }}
            </div>
          </div>
          
          <div class="order-actions">
            <button 
              v-if="order.status === 'preparing'" 
              @click="updateStatus(order.id, 'ready')"
              class="btn-ready"
            >
              Marcar como Pronto
            </button>
            <button 
              v-if="order.status === 'ready'" 
              @click="updateStatus(order.id, 'delivered')"
              class="btn-delivered"
            >
              Marcar como Entregue
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useSupplierStore } from '@/stores/supplier'
  
  const supplierStore = useSupplierStore()
  const statusFilter = ref('all')
  const dateFilter = ref('')
  
  onMounted(async () => {
    await supplierStore.fetchSupplierProfile()
  })
  
  const filteredOrders = computed(() => {
    let orders = [...supplierStore.orders]
    
    // Filtrar por status
    if (statusFilter.value !== 'all') {
      orders = orders.filter(order => order.status === statusFilter.value)
    }
    
    // Filtrar por data
    if (dateFilter.value) {
      const filterDate = new Date(dateFilter.value).toISOString().split('T')[0]
      orders = orders.filter(order => {
        const orderDate = order.createdAt.split('T')[0]
        return orderDate === filterDate
      })
    }
    
    // Ordenar por data (mais recente primeiro)
    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  })
  
  function getStatusText(status) {
    const statusMap = {
      'preparing': 'Em preparo',
      'ready': 'Pronto para entrega',
      'delivered': 'Entregue'
    }
    return statusMap[status] || status
  }
  
  function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleString('pt-BR', options)
  }
  
  async function updateStatus(orderId, status) {
    await supplierStore.updateOrderStatus(orderId, status)
  }
  </script>
  
  <style scoped>
  .orders-management {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .orders-filters {
    display: flex;
    gap: 20px;
    margin: 20px 0;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  .filter-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .filter-group label {
    font-weight: 500;
  }
  
  .filter-group select, .filter-group input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .orders-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .order-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .order-id {
    font-weight: bold;
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
  
  .order-date {
    color: #6c757d;
    font-size: 0.9rem;
  }
  
  .order-customer {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    color: #333;
  }
  
  .order-items {
    margin: 10px 0;
  }
  
  .order-item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 1px dashed #eee;
  }
  
  .item-quantity {
    color: #666;
  }
  
  .item-name {
    flex-grow: 1;
    margin-left: 10px;
  }
  
  .order-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }
  
  .delivery-point {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
  }
  
  .order-total {
    font-weight: bold;
  }
  
  .order-actions {
    margin-top: 15px;
    text-align: right;
  }
  
  .btn-ready, .btn-delivered {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
  }
  
  .btn-ready {
    background-color: #28a745;
    color: white;
  }
  
  .btn-delivered {
    background-color: #17a2b8;
    color: white;
  }
  </style>