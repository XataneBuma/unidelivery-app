<template>
    <div class="admin-dashboard">
      <h1>Painel de Administração</h1>
      <div class="admin-content">
        <nav class="admin-nav">
          <router-link to="/admin/users" class="nav-link">
            <font-awesome-icon icon="users" />
            Gerenciar Usuários
          </router-link>
          <router-link to="/admin/suppliers" class="nav-link">
            <font-awesome-icon icon="store" />
            Gerenciar Fornecedores
          </router-link>
          <router-link to="/admin/orders" class="nav-link">
            <font-awesome-icon icon="list" />
            Visualizar Pedidos
          </router-link>
          <router-link to="/admin/settings" class="nav-link">
            <font-awesome-icon icon="cog" />
            Configurações
          </router-link>
        </nav>
        
        <div class="admin-stats">
          <div class="stat-card">
            <h3>Usuários Registrados</h3>
            <p class="stat-value">1,245</p>
          </div>
          <div class="stat-card">
            <h3>Fornecedores Ativos</h3>
            <p class="stat-value">42</p>
          </div>
          <div class="stat-card">
            <h3>Pedidos Hoje</h3>
            <p class="stat-value">87</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Lógica do componente pode ser adicionada aqui
  </script>
  
  <style scoped>
  .admin-dashboard {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .admin-content {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }
  
  .admin-nav {
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .nav-link {
    padding: 12px 15px;
    background-color: #f5f5f5;
    border-radius: 6px;
    text-decoration: none;
    color: #333;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background-color 0.3s;
  }
  
  .nav-link:hover {
    background-color: #e0e0e0;
  }
  
  .nav-link.router-link-active {
    background-color: #42b983;
    color: white;
  }
  
  .admin-stats {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
  
  .stat-card {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
  }
  
  .stat-card h3 {
    margin: 0 0 10px 0;
    font-size: 1rem;
    color: #666;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    color: #42b983;
  }
  </style>