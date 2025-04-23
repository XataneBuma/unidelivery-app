<template>
    <div class="checkout-view">
      <div class="checkout-container">
        <h1>Finalizar Pedido</h1>
        
        <div class="delivery-section">
          <h2>Selecione o ponto de entrega</h2>
          <location-picker @point-selected="selectDeliveryPoint" />
        </div>
        
        <div class="order-summary">
          <h2>Resumo do Pedido</h2>
          <div class="order-items">
            <div v-for="item in cartItems" :key="item.id" class="order-item">
              <span class="item-quantity">{{ item.quantity }}x</span>
              <span class="item-name">{{ item.name }}</span>
              <span class="item-price">MZN {{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          <div class="order-total">
            <span>Total:</span>
            <span>MZN {{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>
        
        <div class="payment-section">
          <h2>Forma de Pagamento</h2>
          <div class="payment-options">
            <label class="payment-option">
              <input type="radio" v-model="paymentMethod" value="pix">
              <span>Carteira Movel</span>
            </label>
            <label class="payment-option">
              <input type="radio" v-model="paymentMethod" value="credit">
              <span>Cartão de Crédito</span>
            </label>
            <label class="payment-option">
              <input type="radio" v-model="paymentMethod" value="debit">
              <span>Cartão de Débito</span>
            </label>
          </div>
        </div>
        
        <button @click="placeOrder" class="btn-place-order" :disabled="!deliveryPoint">
          Confirmar Pedido
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCartStore } from '@/stores/cart'
  import { useOrderStore } from '@/stores/order'
  import LocationPicker from '@/components/common/LocationPicker.vue'
  
  const router = useRouter()
  const cartStore = useCartStore()
  const orderStore = useOrderStore()
  
  const deliveryPoint = ref(null)
  const paymentMethod = ref('pix')
  
  const cartItems = computed(() => cartStore.items)
  const cartTotal = computed(() => cartStore.total)
  
  function selectDeliveryPoint(point) {
    deliveryPoint.value = point
  }
  
  async function placeOrder() {
    if (!deliveryPoint.value) return
    
    try {
      const orderData = {
        items: cartItems.value,
        total: cartTotal.value,
        deliveryPoint: deliveryPoint.value.name,
        paymentMethod: paymentMethod.value
      }
      
      await orderStore.createOrder(orderData)
      cartStore.clearCart()
      router.push('/consumer/order-confirmation')
    } catch (error) {
      console.error('Error placing order:', error)
    }
  }
  </script>
  
  <style scoped>
  .checkout-view {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .checkout-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .delivery-section, .order-summary, .payment-section {
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
  
  .order-total {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }
  
  .payment-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
  }
  
  .payment-option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .payment-option:hover {
    background-color: #f5f5f5;
  }
  
  .btn-place-order {
    padding: 15px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
  }
  
  .btn-place-order:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  </style>