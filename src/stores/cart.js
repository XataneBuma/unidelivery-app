import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import OrderService from '@/services/order'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const orderHistory = ref([])
  
  // Mock de histórico de pedidos
  const mockOrders = [
    {
      id: 1001,
      date: '2023-05-15',
      status: 'Entregue',
      items: [
        { id: 101, name: 'X-Burger', price: 12.90, quantity: 2 },
        { id: 102, name: 'X-Salada', price: 14.90, quantity: 1 }
      ],
      total: 40.70,
      deliveryPoint: 'Bloco A - Entrada Principal'
    },
    {
      id: 1002,
      date: '2023-05-10',
      status: 'Entregue',
      items: [
        { id: 201, name: 'Pizza Margherita', price: 29.90, quantity: 1 }
      ],
      total: 29.90,
      deliveryPoint: 'Biblioteca Central'
    }
  ]

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })
  
  const total = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })
  
  function addItem(product) {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({
        ...product,
        quantity: 1
      })
    }
  }
  
  function removeItem(product) {
    items.value = items.value.filter(item => item.id !== product.id)
  }
  
  function updateQuantity(product, newQuantity) {
    const item = items.value.find(item => item.id === product.id)
    if (item) {
      item.quantity = newQuantity
    }
  }
  
  function clearCart() {
    items.value = []
  }

  async function checkout(orderData) {
    try {
      // Simular envio do pedido
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Criar um novo pedido mockado
      const newOrder = {
        id: Math.floor(Math.random() * 9000) + 1000,
        date: new Date().toISOString().split('T')[0],
        status: 'Preparando',
        items: [...items.value],
        total: total.value,
        deliveryPoint: orderData.deliveryPoint
      }
      
      orderHistory.value.unshift(newOrder)
      clearCart()
      
      return { success: true, order: newOrder }
    } catch (error) {
      console.error('Checkout error:', error)
      return { success: false, error: 'Falha ao finalizar pedido' }
    }
  }

  async function fetchOrderHistory() {
    try {
      // Simular busca no histórico
      await new Promise(resolve => setTimeout(resolve, 800))
      orderHistory.value = [...mockOrders]
      return orderHistory.value
    } catch (error) {
      console.error('Error fetching order history:', error)
      return []
    }
  }

  return { 
    items, 
    orderHistory,
    totalItems, 
    total, 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart,
    checkout,
    fetchOrderHistory
  }
})