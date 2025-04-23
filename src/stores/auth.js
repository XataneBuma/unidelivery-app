import { defineStore } from 'pinia'
import { ref } from 'vue'
import AuthService from '@/services/auth'

// Usuários mockados para desenvolvimento
const mockUsers = [
  {
    id: 1,
    name: 'João Estudante',
    email: 'joao@universidade.com',
    role: 'consumer',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'Maria Fornecedora',
    email: 'maria@lanchonete.com',
    role: 'supplier',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 3,
    name: 'Admin Sistema',
    email: 'admin@deliveryuni.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 4,
    name: 'suporte Sistema',
    email: 'suporte@deliveryuni.com',
    role: 'support',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }
]

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  
  async function login(credentials) {
    try {
      // Simula chamada à API
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const foundUser = mockUsers.find(u => 
        u.email === credentials.email && 
        credentials.password === '123456' // Senha mockada
      )
      
      if (foundUser) {
        user.value = foundUser
        isAuthenticated.value = true
        localStorage.setItem('userRole', foundUser.role)
        localStorage.setItem('token', 'mock-token-' + foundUser.id)
        return true
      } else {
        throw new Error('Credenciais inválidas')
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }
  
  async function register(userData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const newUser = {
        id: Math.max(...mockUsers.map(u => u.id)) + 1,
        ...userData,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
      }
      
      mockUsers.push(newUser)
      return newUser
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }
  
  async function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
  }
  
  async function checkAuth() {
    const storedRole = localStorage.getItem('userRole')
    const token = localStorage.getItem('token')
    if (token && token.startsWith('mock-token-')) {
      const userId = parseInt(token.replace('mock-token-', ''))
      const foundUser = mockUsers.find(u => u.id === userId)
      if (foundUser) {
        user.value = foundUser
        isAuthenticated.value = true
        user.value.role = storedRole
        console.log("Role do usuário:", user.value.role)
      }
    }
  }

  return { user, isAuthenticated, login, register, logout, checkAuth }
})