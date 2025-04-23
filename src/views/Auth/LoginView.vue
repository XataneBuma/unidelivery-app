<template>
    <div class="auth-page">
      <div class="auth-container">
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
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
          <button type="submit" class="btn-primary" :disabled="loading">
            <span v-if="!loading">Entrar</span>
            <span v-else>Carregando...</span>
          </button>
          <div class="auth-links">
            <router-link to="/register">Não tem uma conta? Registre-se</router-link>
            <router-link to="/forgot-password">Esqueceu sua senha?</router-link>
          </div>
        </form>
        <div class="social-login">
          <button @click="loginWithGoogle" class="btn-google">
            <font-awesome-icon :icon="['fab', 'google']" />
            Entrar com Google
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
    email: '',
    password: ''
  })
  const loading = ref(false)
  
  async function handleLogin() {
    try {
      loading.value = true
      await authStore.login(form.value)
      toast.success('Login realizado com sucesso!')
      
      // Redirecionar baseado no perfil do usuário
      switch (authStore.user.role) {
        case 'consumer':
          router.push('/consumer/dashboard')
          break
        case 'supplier':
          router.push('/supplier/dashboard')
          break
        case 'admin':
          router.push('/admin/dashboard')
          break
        case 'support':
          router.push('/support/dashboard')
          break
        default:
          router.push('/home')
      }
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.')
      console.error('Login error:', error)
    } finally {
      loading.value = false
    }
  }
  
  async function loginWithGoogle() {
    try {
      // Implementar login com Google
      toast.info('Login com Google em desenvolvimento')
    } catch (error) {
      toast.error('Erro ao fazer login com Google')
      console.error('Google login error:', error)
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
  input {
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
    display: flex;
    justify-content: space-between;
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