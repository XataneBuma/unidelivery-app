<template>
    <div class="not-found">
      <div class="error-container">
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <p>A página que você está procurando não existe ou foi movida.</p>
        <router-link to="/" class="home-link">Voltar para a página inicial</router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  // Lógica do componente pode ser adicionada aqui se necessário
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
    padding: 20px;
  }
  
  .error-container {
    max-width: 500px;
  }
  
  h1 {
    font-size: 5rem;
    margin: 0;
    color: #42b983;
  }
  
  h2 {
    font-size: 2rem;
    margin: 10px 0;
  }
  
  p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 20px;
  }
  
  .home-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .home-link:hover {
    background-color: #369f6b;
  }
  </style>