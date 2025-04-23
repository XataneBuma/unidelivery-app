<template>
    <div v-if="show" class="cart-modal-overlay">
      <div class="cart-modal">
        <div class="cart-header">
          <h3>Seu Carrinho</h3>
          <button @click="closeModal" class="close-button">
            <font-awesome-icon icon="times" />
          </button>
        </div>
        
        <div v-if="items.length > 0" class="cart-content">
          <div v-for="item in items" :key="item.id" class="cart-item">
            <div class="item-info">
              <h4>{{ item.name }}</h4>
              <p>MZN {{ item.price.toFixed(2) }}</p>
            </div>
            <div class="item-actions">
              <button @click="decreaseQuantity(item)" class="quantity-btn">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
              <button @click="removeItem(item)" class="remove-btn">
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </div>
          
          <div class="cart-summary">
            <div class="total">
              <span>Total:</span>
              <span>MZN {{ total.toFixed(2) }}</span>
            </div>
            <button @click="proceedToCheckout" class="checkout-btn">
              Finalizar Pedido
            </button>
          </div>
        </div>
        
        <div v-else class="empty-cart">
          <font-awesome-icon icon="shopping-cart" size="2x" />
          <p>Seu carrinho está vazio</p>
          <button @click="closeModal" class="continue-shopping-btn">
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useCartStore } from '@/stores/cart'
  
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    }
  })
  
  const emit = defineEmits(['update:show', 'checkout'])
  
  const cartStore = useCartStore()
  
  const items = computed(() => cartStore.items)
  const total = computed(() => cartStore.total)
  
  function closeModal() {
    emit('update:show', false)
  }
  
  function increaseQuantity(item) {
    cartStore.updateQuantity(item, item.quantity + 1)
  }
  
  function decreaseQuantity(item) {
    if (item.quantity > 1) {
      cartStore.updateQuantity(item, item.quantity - 1)
    } else {
      cartStore.removeItem(item)
    }
  }
  
  function removeItem(item) {
    cartStore.removeItem(item)
  }
  
  function proceedToCheckout() {
    emit('checkout')
    closeModal()
  }
  </script>
  
  <style scoped>
  .cart-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .cart-modal {
    background-color: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .cart-header {
    padding: 15px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #666;
  }
  
  .cart-content {
    padding: 15px;
    overflow-y: auto;
    flex-grow: 1;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f5f5f5;
  }
  
  .item-info h4 {
    margin: 0;
    font-size: 1rem;
  }
  
  .item-info p {
    margin: 5px 0 0 0;
    font-weight: bold;
    color: #42b983;
  }
  
  .item-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .quantity-btn {
    width: 25px;
    height: 25px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: none;
    cursor: pointer;
  }
  
  .remove-btn {
    background: none;
    border: none;
    color: #ff4757;
    cursor: pointer;
  }
  
  .cart-summary {
    padding: 15px 0;
    border-top: 1px solid #eee;
  }
  
  .total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .checkout-btn {
    width: 100%;
    padding: 12px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .checkout-btn:hover {
    background-color: #369f6b;
  }
  
  .empty-cart {
    padding: 30px 15px;
    text-align: center;
  }
  
  .empty-cart p {
    margin: 15px 0;
    font-size: 1.1rem;
    color: #666;
  }
  
  .continue-shopping-btn {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>