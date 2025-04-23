<template>
    <div class="supplier-menu-view">

        <div v-if="isLoading" class="loading-state">
            <font-awesome-icon icon="spinner" spin size="2x" />
            <p>Carregando cardápio...</p>
          </div>
      
          <div v-else-if="!supplier.id" class="error-state">
            <font-awesome-icon icon="exclamation-triangle" size="2x" />
            <p>Não foi possível carregar o cardápio</p>
            <button @click="goBack" class="btn-retry">
              Voltar
            </button>
          </div>

          <div v-else>
      <div class="supplier-header">
        <button @click="goBack" class="btn-back">
          <font-awesome-icon icon="arrow-left" />
          Voltar
        </button>
        <div class="supplier-info">
          <img :src="supplier.image" :alt="supplier.name" class="supplier-image">
          <div class="supplier-details">
            <h1>{{ supplier.name }}</h1>
            <div class="supplier-meta">
              <rating-display :rating="supplier.rating" show-value />
              <span class="delivery-time">{{ supplier.deliveryTime }}</span>
              <span class="delivery-fee" v-if="supplier.deliveryFee > 0">
                Taxa de entrega: MZN {{ supplier.deliveryFee.toFixed(2) }}
              </span>
              <span class="delivery-fee" v-else>Entrega grátis</span>
            </div>
          </div>
        </div>
      </div>
  
      <div class="menu-container">
        <div class="menu-categories">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="currentCategory = category"
            :class="{ 'active': currentCategory === category }"
            class="category-btn"
          >
            {{ category }}
          </button>
        </div>
  
        <div class="menu-items">
          <div 
            v-for="item in filteredItems" 
            :key="item.id" 
            class="menu-item"
          >
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <p class="item-description">{{ item.description }}</p>
              <p class="item-price">MZN {{ item.price.toFixed(2) }}</p>
            </div>
            <div class="item-actions">
              <button 
                @click="addToCart(item)" 
                class="btn-add-to-cart"
              >
                <font-awesome-icon icon="plus" />
                Adicionar
              </button>
            </div>
          </div>
        </div>
    </div>
      </div>
  
      <mini-cart v-if="cartItems.length > 0" @checkout="goToCheckout" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useSupplierStore } from '@/stores/supplier'
  import { useCartStore } from '@/stores/cart'
  import { useAuthStore } from '@/stores/auth'
  import RatingDisplay from '@/components/common/RatingDisplay.vue'
  import MiniCart from '@/components/consumer/MiniCart.vue'
  
  const route = useRoute()
  const router = useRouter()
  const supplierStore = useSupplierStore()
  const cartStore = useCartStore()
  const authStore = useAuthStore()

  const supplierId = route.params.id

  
  
  const supplier = ref({})
  const currentCategory = ref('Todos')
  const isLoading = ref(false)
  
  const categories = computed(() => {
    const allCategories = supplier.value.products?.map(item => item.category) || []
    return ['Todos', ...new Set(allCategories)]
  })
  
  const filteredItems = computed(() => {
    if (currentCategory.value === 'Todos') {
      return supplier.value.products || []
    }
    return supplier.value.products?.filter(item => item.category === currentCategory.value) || []
  })
  
  const cartItems = computed(() => cartStore.items)
  
  onMounted(async () => {
    isLoading.value = true
    try {
      const supplierData = await supplierStore.fetchSupplierById(supplierId)
      supplier.value = supplierData
    } catch (error) {
      console.error('Error fetching supplier:', error)
      router.push('/consumer/dashboard')
    } finally {
      isLoading.value = false
    }
    console.log('Role do usuário no SupplierMenuView:', authStore.user?.role)
  })
  
  function goBack() {
    router.go(-1)
  }
  
  function addToCart(item) {
    cartStore.addItem(item)
  }
  
  function goToCheckout() {
    router.push('/consumer/checkout')
  }
  </script>
  
  <style scoped>
  .supplier-menu-view {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .supplier-header {
    margin-bottom: 30px;
    position: relative;
  }
  
  .btn-back {
    background: none;
    border: none;
    color: #42b983;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 15px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .supplier-info {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .supplier-image {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .supplier-details h1 {
    margin: 0 0 10px 0;
  }
  
  .supplier-meta {
    display: flex;
    align-items: center;
    gap: 15px;
    color: #666;
  }
  
  .delivery-time {
    background-color: #f0f0f0;
    padding: 4px 8px;
    border-radius: 4px;
  }
  
  .delivery-fee {
    color: #42b983;
  }
  
  .menu-container {
    display: flex;
    gap: 30px;
  }
  
  .menu-categories {
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .category-btn {
    padding: 10px 15px;
    background: none;
    border: 1px solid #ddd;
    border-radius: 6px;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .category-btn:hover {
    border-color: #42b983;
  }
  
  .category-btn.active {
    background-color: #42b983;
    color: white;
    border-color: #42b983;
  }
  
  .menu-items {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .menu-item {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 8px;
  }
  
  .item-info {
    flex-grow: 1;
  }
  
  .item-info h3 {
    margin: 0 0 8px 0;
  }
  
  .item-description {
    color: #666;
    font-size: 0.9rem;
    margin: 8px 0;
  }
  
  .item-price {
    font-weight: bold;
    color: #42b983;
  }
  
  .item-actions {
    display: flex;
    align-items: center;
  }
  
  .btn-add-to-cart {
    padding: 8px 15px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  </style>