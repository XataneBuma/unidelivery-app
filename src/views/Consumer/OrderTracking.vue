<template>
    <div class="order-tracking">
      <div class="tracking-header">
        <h1>Acompanhe seu pedido</h1>
        <p class="order-number">Pedido #{{ order?.id }}</p>
      </div>
  
      <div class="status-timeline">
        <div 
          v-for="status in orderStatuses" 
          :key="status.id" 
          class="status-step"
          :class="{
            'active': isStatusActive(status.status),
            'completed': isStatusCompleted(status.status)
          }"
        >
          <div class="status-icon">
            <font-awesome-icon :icon="status.icon" />
          </div>
          <div class="status-info">
            <h3>{{ status.label }}</h3>
            <p v-if="isStatusCompleted(status.status)" class="status-time">
              {{ getStatusTime(status.status) }}
            </p>
          </div>
        </div>
      </div>
  
      <div class="order-details">
        <div class="delivery-info">
          <h2>Informações de Entrega</h2>
          <p><strong>Local:</strong> {{ order?.deliveryPoint }}</p>
          <p><strong>Previsão:</strong> {{ estimatedDelivery }}</p>
        </div>
  
        <div class="order-summary">
          <h2>Resumo do Pedido</h2>
          <div class="order-items">
            <div v-for="item in order?.items" :key="item.id" class="order-item">
              <span class="quantity">{{ item.quantity }}x</span>
              <span class="name">{{ item.name }}</span>
              <span class="price">MZN {{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          <div class="order-total">
            <span>Total:</span>
            <span>MZN {{ order?.total?.toFixed(2) }}</span>
          </div>
        </div>
      </div>
  
      <div class="supplier-contact">
        <h2>Precisa de ajuda?</h2>
        <button @click="contactSupplier" class="contact-button">
          <font-awesome-icon icon="phone" /> Falar com o fornecedor
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useOrderStore } from '@/stores/order'
  
  const route = useRoute()
  const orderStore = useOrderStore()
  
  const order = ref(null)
  const loading = ref(true)
  
  const orderStatuses = computed(() => orderStore.orderStatuses)
  
  onMounted(async () => {
    try {
      order.value = await orderStore.fetchOrder(route.params.id)
    } catch (error) {
      console.error('Error loading order:', error)
    } finally {
      loading.value = false
    }
  })
  
  const estimatedDelivery = computed(() => {
    if (!order.value?.createdAt) return 'Calculando...'
    
    const deliveryTime = new Date(order.value.createdAt)
    deliveryTime.setMinutes(deliveryTime.getMinutes() + 45) // Adiciona 45 minutos como estimativa
    
    return deliveryTime.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  })
  
  function isStatusActive(status) {
    return order.value?.status === status
  }
  
  function isStatusCompleted(status) {
    if (!order.value) return false
    
    const currentIndex = orderStatuses.value.findIndex(s => s.status === order.value.status)
    const statusIndex = orderStatuses.value.findIndex(s => s.status === status)
    
    return statusIndex < currentIndex
  }
  
  function getStatusTime(status) {
    // Em uma implementação real, você buscaria os tempos reais da API
    const statusTimes = {
      received: 'Pedido recebido às ' + new Date().toLocaleTimeString('pt-BR'),
      preparing: 'Em preparação desde ' + new Date().toLocaleTimeString('pt-BR'),
      ready: 'Pronto às ' + new Date().toLocaleTimeString('pt-BR'),
      'on-the-way': 'Saiu para entrega às ' + new Date().toLocaleTimeString('pt-BR')
    }
    
    return statusTimes[status] || ''
  }
  
  function contactSupplier() {
    // Implemente a lógica de contato (WhatsApp, telefone, etc.)
    console.log('Contatar fornecedor')
  }
  </script>
  
  <style scoped>
  .order-tracking {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .tracking-header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .order-number {
    color: #666;
    font-size: 1.1rem;
  }
  
  .status-timeline {
    position: relative;
    padding-left: 30px;
    margin-bottom: 40px;
  }
  
  .status-timeline::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #e0e0e0;
  }
  
  .status-step {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 25px;
    position: relative;
  }
  
  .status-step:last-child {
    margin-bottom: 0;
  }
  
  .status-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  
  .status-step.completed .status-icon {
    background-color: #42b983;
    color: white;
  }
  
  .status-step.active .status-icon {
    background-color: #42b983;
    color: white;
    animation: pulse 1.5s infinite;
  }
  
  .status-info {
    flex-grow: 1;
  }
  
  .status-info h3 {
    margin: 0 0 5px 0;
    font-size: 1.1rem;
  }
  
  .status-time {
    color: #666;
    font-size: 0.9rem;
    margin: 0;
  }
  
  .order-details {
    display: grid;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .delivery-info, .order-summary {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
  }
  
  .order-items {
    margin: 15px 0;
  }
  
  .order-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px dashed #eee;
  }
  
  .order-item:last-child {
    border-bottom: none;
  }
  
  .order-total {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }
  
  .supplier-contact {
    text-align: center;
    margin-top: 30px;
  }
  
  .contact-button {
    padding: 12px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  </style>