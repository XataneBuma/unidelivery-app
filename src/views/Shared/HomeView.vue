<template>
    <div class="home-view">
      <div class="hero-section">
        <h1>Delivery Universitário</h1>
        <p>Peça comida dos melhores fornecedores do campus</p>
        <div class="cta-buttons">
          <router-link to="/register" class="btn-primary">Cadastre-se</router-link>
          <router-link to="/login" class="btn-secondary">Entrar</router-link>
        </div>
      </div>
      
      <div class="features-section">
        <h2>Por que usar nosso serviço?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <font-awesome-icon icon="map-marker-alt" size="2x" />
            <h3>Pontos Fixos</h3>
            <p>Encontre seu pedido nos pontos de entrega do campus</p>
          </div>
          <div class="feature-card">
            <font-awesome-icon icon="clock" size="2x" />
            <h3>Rápido</h3>
            <p>Entrega rápida dentro do ambiente universitário</p>
          </div>
          <div class="feature-card">
            <font-awesome-icon icon="money-bill-wave" size="2x" />
            <h3>Preços Acessíveis</h3>
            <p>Opções para todos os bolsos</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Lógica do componente pode ser adicionada aqui se necessário
  </script>
  
  <style scoped>
  .home-view {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .hero-section {
    text-align: center;
    padding: 60px 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 40px;
  }
  
  .hero-section h1 {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #2c3e50;
  }
  
  .hero-section p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 30px;
  }
  
  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  
  .btn-primary {
    padding: 12px 24px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    text-decoration: none;
    font-size: 1rem;
  }
  
  .btn-secondary {
    padding: 12px 24px;
    background-color: white;
    color: #42b983;
    border: 1px solid #42b983;
    border-radius: 4px;
    text-decoration: none;
    font-size: 1rem;
  }
  
  .features-section {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .features-section h2 {
    font-size: 2rem;
    margin-bottom: 40px;
    color: #2c3e50;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .feature-card {
    padding: 30px 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .feature-card h3 {
    margin: 20px 0 10px 0;
    font-size: 1.3rem;
  }
  
  .feature-card p {
    color: #666;
  }
  </style>