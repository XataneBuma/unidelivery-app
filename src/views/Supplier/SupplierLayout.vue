<template>
    <div class="supplier-layout">
      <aside class="supplier-sidebar">
        <div class="sidebar-header">
          <h2>{{ supplier.name || 'Loading...' }}</h2>
          <p>Fornecedor</p>
        </div>
        
        <nav class="sidebar-nav">
          <router-link to="/supplier/dashboard" class="nav-link">
            <font-awesome-icon icon="tachometer-alt" />
            Dashboard
          </router-link>
          <router-link to="/supplier/menu" class="nav-link">
            <font-awesome-icon icon="utensils" />
            Menu
          </router-link>
          <router-link to="/supplier/orders" class="nav-link">
            <font-awesome-icon icon="list" />
            Pedidos
          </router-link>
          <router-link to="/supplier/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            Perfil
          </router-link>
        </nav>
        
        <div class="sidebar-footer">
          <button @click="logout" class="btn-logout">
            <font-awesome-icon icon="sign-out-alt" />
            Sair
          </button>
        </div>
      </aside>
      
      <main class="supplier-content">
        <SupplierDashboard v-if="$route.path === '/supplier/dashboard'" />
        <router-view v-else />
      </main>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { useSupplierStore } from '@/stores/supplier'
  
  const authStore = useAuthStore()
  const supplierStore = useSupplierStore()
  const router = useRouter()
  
  const supplier = computed(() => supplierStore.currentSupplier || {name: 'Loading...'})

  onMounted(async () => {
    await supplierStore.fetchSupplierProfile()
  })

  
  function logout() {
    authStore.logout()
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .supplier-layout {
    display: flex;
    min-height: 100vh;
  }
  
  .supplier-sidebar {
    width: 250px;
    background-color: #2c3e50;
    color: white;
    display: flex;
    flex-direction: column;
  }
  
  .sidebar-header {
    padding: 20px;
    border-bottom: 1px solid #34495e;
  }
  
  .sidebar-header h2 {
    margin: 0 0 5px 0;
    font-size: 1.2rem;
  }
  
  .sidebar-header p {
    margin: 0;
    color: #bdc3c7;
    font-size: 0.9rem;
  }
  
  .sidebar-nav {
    flex-grow: 1;
    padding: 15px 0;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: #ecf0f1;
    text-decoration: none;
    transition: background-color 0.3s;
  }
  
  .nav-link:hover {
    background-color: #34495e;
  }
  
  .nav-link.router-link-active {
    background-color: #42b983;
    color: white;
  }
  
  .nav-link svg {
    margin-right: 10px;
    width: 16px;
  }
  
  .sidebar-footer {
    padding: 15px;
    border-top: 1px solid #34495e;
  }
  
  .btn-logout {
    width: 100%;
    padding: 10px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .supplier-content {
    flex-grow: 1;
    background-color: #f8f9fa;
    padding: 20px;
  }
  </style>