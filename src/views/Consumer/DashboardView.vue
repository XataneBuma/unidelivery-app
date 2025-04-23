<template>
    <div class="consumer-dashboard">
      <header class="dashboard-header">
        <h1>Bem-vindo, {{ user.name }}</h1>
        <div class="header-actions">
          <button @click="showCart = true" class="cart-button">
            <font-awesome-icon icon="shopping-cart" />
            <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
          </button>
        </div>
      </header>
      
      <div class="dashboard-content">
        <div class="search-section">
          <div class="search-bar">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar restaurantes ou produtos..."
            >
            <button class="search-button">
              <font-awesome-icon icon="search" />
            </button>
          </div>
          <div class="filters">
            <select v-model="selectedCategory">
              <option value="">Todas categorias</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
            <select v-model="sortBy">
              <option value="rating">Melhor avaliados</option>
              <option value="distance">Mais próximos</option>
              <option value="price-asc">Preço: menor para maior</option>
              <option value="price-desc">Preço: maior para menor</option>
            </select>
          </div>
        </div>
        
        <div class="suppliers-section">
          <h2>Restaurantes e Lanchonetes</h2>
          <div class="suppliers-grid">
            <div 
              v-for="supplier in filteredSuppliers" 
              :key="supplier.id" 
              class="supplier-card"
              @click="viewSupplier(supplier.id)"
            >
              <div class="supplier-image">
                <img :src="supplier.image || '/placeholder-restaurant.jpg'" :alt="supplier.name">
              </div>
              <div class="supplier-info">
                <h3>{{ supplier.name }}</h3>
                <rating-display :rating="supplier.rating" />
                <div class="delivery-info">
                  <span class="delivery-time">{{ supplier.deliveryTime }} min</span>
                  <span class="delivery-fee" v-if="supplier.deliveryFee > 0">
                    MZN {{ supplier.deliveryFee.toFixed(2) }} entrega
                  </span>
                  <span class="delivery-fee" v-else>Entrega grátis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal do Carrinho -->
      <cart-modal v-model:show="showCart" @checkout="handleCheckout" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { useSupplierStore } from '@/stores/supplier'
  import { useCartStore } from '@/stores/cart'
  import CartModal from '@/components/consumer/CartModal.vue'
  import RatingDisplay from '@/components/common/RatingDisplay.vue'
  
  const authStore = useAuthStore()
  const supplierStore = useSupplierStore()
  const cartStore = useCartStore()
  const router = useRouter()

  
  const user = computed(() => authStore.user)
  const cartItemCount = computed(() => cartStore.totalItems)
  
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const sortBy = ref('rating')
  const showCart = ref(false)
  
  const categories = ref([
    'Lanches', 'Pizza', 'Brasileira', 'Japonesa', 'Vegetariana', 'Saudável', 'Doces'
  ])
  
  const filteredSuppliers = computed(() => {
    let suppliers = [...supplierStore.suppliers]
    
    // Filtro por busca
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      suppliers = suppliers.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.category.toLowerCase().includes(query)
      )
    }
    
    // Filtro por categoria
    if (selectedCategory.value) {
      suppliers = suppliers.filter(s => s.category === selectedCategory.value)
    }
    
    // Ordenação
    switch (sortBy.value) {
      case 'rating':
        suppliers.sort((a, b) => b.rating - a.rating)
        break
      case 'distance':
        suppliers.sort((a, b) => a.distance - b.distance)
        break
      case 'price-asc':
        suppliers.sort((a, b) => a.minPrice - b.minPrice)
        break
      case 'price-desc':
        suppliers.sort((a, b) => b.minPrice - a.minPrice)
        break
    }
    
    return suppliers
  })

  
  
  onMounted(async () => {
    await supplierStore.fetchSuppliers()
    console.log(supplierStore.suppliers)
  })
  
  function viewSupplier(id) {
  if (!id) {
    console.error('Invalid supplierId:', id)
    return
  }
  console.log('Navigating to supplier:', id)
  router.push(`/consumer/supplier/${id}`)
}
  function handleCheckout() {
    showCart.value = false
    router.push('/consumer/checkout')
  }
  </script>
  
  <style scoped>
  .consumer-dashboard {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .cart-button {
    position: relative;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #333;
  }
  .cart-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #ff4757;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
  }
  .search-section {
    margin-bottom: 30px;
  }
  .search-bar {
    display: flex;
    margin-bottom: 15px;
  }
  .search-bar input {
    flex-grow: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    font-size: 1rem;
  }
  .search-button {
    padding: 0 15px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
  .filters {
    display: flex;
    gap: 10px;
  }
  .filters select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
  }
  .suppliers-section h2 {
    margin-bottom: 15px;
    color: #333;
  }
  .suppliers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  .supplier-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .supplier-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  .supplier-image {
    height: 160px;
    overflow: hidden;
  }
  .supplier-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .supplier-info {
    padding: 15px;
  }
  .supplier-info h3 {
    margin: 0 0 8px 0;
  }
  .delivery-info {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 0.9rem;
    color: #555;
  }
  .delivery-time {
    color: #333;
    font-weight: 500;
  }
  .delivery-fee {
    color: #42b983;
  }
  </style>