<template>
    <div class="confirmation-view">
      <div class="confirmation-container">
        <div class="confirmation-icon">
          <font-awesome-icon icon="check-circle" />
        </div>
        <h1>Pedido Confirmado!</h1>
        <p>Seu pedido foi recebido e está sendo preparado.</p>
        <p>Número do pedido: #{{ orderId }}</p>
        <router-link :to="`/consumer/orders/${orderId}`" class="btn-track">
            <font-awesome-icon icon="map-marker-alt" /> Acompanhar Pedido
          </router-link>
        <router-link to="/consumer/dashboard" class="btn-back">
          Voltar para a página inicial
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useOrderStore } from '@/stores/order'
  
  const orderStore = useOrderStore()
  const orderId = ref(null)
  
  onMounted(() => {
    orderId.value = orderStore.currentOrder?.id || '12345' // Usa mock se não houver pedido
  })
  </script>
  
  <style scoped>
  .confirmation-view {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    padding: 20px;
  }
  
  .confirmation-container {
    text-align: center;
    max-width: 500px;
    padding: 40px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .confirmation-icon {
    font-size: 4rem;
    color: #42b983;
    margin-bottom: 20px;
  }
  
  .btn-back {
    display: inline-block;
    margin-top: 30px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  </style>