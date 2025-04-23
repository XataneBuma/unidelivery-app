<template>
    <div class="mini-cart">
      <div class="cart-header">
        <h3>Seu Pedido</h3>
        <span class="item-count">{{ totalItems }} itens</span>
      </div>
      
      <div class="cart-items">
        <div v-for="item in items" :key="item.id" class="cart-item">
          <span class="item-quantity">{{ item.quantity }}x</span>
          <span class="item-name">{{ item.name }}</span>
          <span class="item-price">MZN {{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
      </div>
      
      <div class="cart-total">
        <span>Total:</span>
        <span>MZN {{ total.toFixed(2) }}</span>
      </div>
      
      <button @click="$emit('checkout')" class="btn-checkout">
        Finalizar Pedido
      </button>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue' // Adicione esta linha
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const items = computed(() => cartStore.items)
const totalItems = computed(() => cartStore.totalItems)
const total = computed(() => cartStore.total)
  </script>
  
  <style scoped>
  .mini-cart {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 15px;
    z-index: 100;
  }
  
  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .cart-header h3 {
    margin: 0;
  }
  
  .item-count {
    background-color: #42b983;
    color: white;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
  }
  
  .cart-items {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 15px;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px dashed #eee;
  }
  
  .cart-item:last-child {
    border-bottom: none;
  }
  
  .item-quantity {
    color: #666;
  }
  
  .item-name {
    flex-grow: 1;
    margin-left: 10px;
  }
  
  .cart-total {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin: 15px 0;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }
  
  .btn-checkout {
    width: 100%;
    padding: 12px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .btn-checkout:hover {
    background-color: #369f6b;
  }
  </style>