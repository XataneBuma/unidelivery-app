<template>
    <div class="support-dashboard">
      <h1>Painel de Suporte</h1>
      <div class="support-content">
        <nav class="support-nav">
          <router-link to="/support/tickets" class="nav-link">
            <font-awesome-icon icon="ticket-alt" />
            Chamados
          </router-link>
          <router-link to="/support/manual-orders" class="nav-link">
            <font-awesome-icon icon="hands-helping" />
            Pedidos Manuais
          </router-link>
          <router-link to="/support/users" class="nav-link">
            <font-awesome-icon icon="user-cog" />
            Assistência a Usuários
          </router-link>
        </nav>
        
        <div class="support-stats">
          <div class="stat-card">
            <h3>Chamados Abertos</h3>
            <p class="stat-value">15</p>
          </div>
          <div class="stat-card">
            <h3>Pedidos Manuais Hoje</h3>
            <p class="stat-value">7</p>
          </div>
          <div class="stat-card">
            <h3>Usuários Atendidos</h3>
            <p class="stat-value">23</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Lógica do componente pode ser adicionada aqui
  </script>
  
  <style scoped>
  .support-dashboard {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .support-content {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }
  
  .support-nav {
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
  
  .support-stats {
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