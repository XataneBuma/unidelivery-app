<template>
    <div class="product-card">
      <div class="product-image">
        <img :src="product.image || '/placeholder-food.jpg'" :alt="product.name">
      </div>
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <p class="description">{{ product.description }}</p>
        <div class="price">MZN {{ product.price.toFixed(2) }}</div>
        <div class="supplier-info">
          <span>{{ product.supplier.name }}</span>
          <rating-display :rating="product.supplier.rating" />
        </div>
      </div>
      <div class="product-actions">
        <button @click="addToCart" class="add-to-cart">
          <font-awesome-icon icon="cart-plus" /> Adicionar
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import { useCartStore } from '@/stores/cart'
  import RatingDisplay from '@/components/common/RatingDisplay.vue'
  
  const props = defineProps({
    product: {
      type: Object,
      required: true
    }
  })
  
  const cartStore = useCartStore()
  
  function addToCart() {
    cartStore.addItem(props.product)
  }
  </script>
  
  <style scoped>
  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform 0.2s;
  }
  .product-card:hover {
    transform: translateY(-5px);
  }
  .product-image {
    height: 160px;
    overflow: hidden;
  }
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .product-info {
    padding: 15px;
    flex-grow: 1;
  }
  .product-info h3 {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
  }
  .description {
    color: #666;
    font-size: 0.9rem;
    margin: 8px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .price {
    font-weight: bold;
    color: #42b983;
    margin: 8px 0;
  }
  .supplier-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    font-size: 0.85rem;
    color: #555;
  }
  .product-actions {
    padding: 0 15px 15px 15px;
  }
  .add-to-cart {
    width: 100%;
    padding: 8px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .add-to-cart:hover {
    background-color: #369f6b;
  }
  </style>