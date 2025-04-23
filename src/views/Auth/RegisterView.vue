<template>
    <div class="auth-page">
      <div class="auth-container">
        <h1>Criar Conta</h1>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="name">Nome Completo</label>
            <input 
              id="name" 
              type="text" 
              v-model="form.name" 
              placeholder="Seu nome" 
              required
            >
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              id="email" 
              type="email" 
              v-model="form.email" 
              placeholder="seu@email.com" 
              required
            >
          </div>
          <div class="form-group">
            <label for="password">Senha</label>
            <input 
              id="password" 
              type="password" 
              v-model="form.password" 
              placeholder="Sua senha" 
              required
            >
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirmar Senha</label>
            <input 
              id="confirmPassword" 
              type="password" 
              v-model="form.confirmPassword" 
              placeholder="Confirme sua senha" 
              required
            >
          </div>
          <div class="form-group">
            <label for="role">Tipo de Conta</label>
            <select id="role" v-model="form.role" required>
              <option value="">Selecione...</option>
              <option value="consumer">Consumidor</option>
              <option value="supplier">Fornecedor</option>
            </select>
          </div>
          <button type="submit" class="btn-primary" :disabled="loading">
            <span v-if="!loading">Registrar</span>
            <span v-else>Carregando...</span>
          </button>
          <div class="auth-links">
            <router-link to="/login">Já tem uma conta? Faça login</router-link>
          </div>
        </form>
        <div class="social-login">
          <button @click="registerWithGoogle" class="btn-google">
            <font-awesome-icon :icon="['fab', 'google']" />
            Registrar com Google
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { useToast } from 'vue-toastification'
  
  const authStore = useAuthStore()
  const router = useRouter()
  const toast = useToast()
  
  const form = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  })
  const loading = ref(false)
  
  async function handleRegister() {
    if (form.value.password !== form.value.confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }
  
    try {
      loading.value = true
      await authStore.register(form.value)
      toast.success('Registro realizado com sucesso!')
      router.push('/login')
    } catch (error) {
      toast.error('Erro ao registrar. Por favor, tente novamente.')
      console.error('Registration error:', error)
    } finally {
      loading.value = false
    }
  }
  
  async function registerWithGoogle() {
    try {
      // Implementar registro com Google
      toast.info('Registro com Google em desenvolvimento')
    } catch (error) {
      toast.error('Erro ao registrar com Google')
      console.error('Google registration error:', error)
    }
  }
  </script>
  
  <style scoped>
  .auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  .auth-container {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  .btn-primary {
    width: 100%;
    padding: 0.75rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
  }
  .btn-primary:hover {
    background-color: #369f6b;
  }
  .btn-primary:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  .auth-links {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.9rem;
  }
  .auth-links a {
    color: #42b983;
    text-decoration: none;
  }
  .auth-links a:hover {
    text-decoration: underline;
  }
  .social-login {
    margin-top: 1.5rem;
    border-top: 1px solid #eee;
    padding-top: 1.5rem;
  }
  .btn-google {
    width: 100%;
    padding: 0.75rem;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .btn-google:hover {
    background-color: #357ae8;
  }
  </style>