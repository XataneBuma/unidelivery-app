<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #42b983;
  --primary-dark: #369f6b;
  --secondary-color: #35495e;
  --light-gray: #f5f5f5;
  --medium-gray: #e0e0e0;
  --dark-gray: #333333;
  --text-color: #2c3e50;
  --error-color: #ff4757;
  --warning-color: #ffa502;
  --success-color: #2ed573;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--light-gray);
}

#app {
  min-height: 100vh;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

button {
  cursor: pointer;
  font-family: inherit;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Transições de rota */
.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.admin-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.support-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>