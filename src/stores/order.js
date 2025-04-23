import { defineStore } from 'pinia'
import { ref } from 'vue'
import OrderService from '@/services/order'

export const useOrderStore = defineStore('order', () => {
  const currentOrder = ref(null)
  const orderHistory = ref([])
  const deliveryPoints = ref([
    { id: 1, name: 'Bloco A - Entrada Principal', location: 'lat,long' },
    { id: 2, name: 'Biblioteca Central', location: 'lat,long' },
    { id: 3, name: 'Restaurante Universitário', location: 'lat,long' }
  ])
  const orderStatuses = ref([
    { id: 1, status: 'received', label: 'Recebido', icon: 'inbox' },
    { id: 2, status: 'preparing', label: 'Em preparação', icon: 'utensils' },
    { id: 3, status: 'ready', label: 'Pronto para entrega', icon: 'check' },
    { id: 4, status: 'on-the-way', label: 'Saiu para entrega', icon: 'motorcycle' },
    { id: 5, status: 'delivered', label: 'Entregue', icon: 'home' }
  ])

  const startStatusUpdates = (orderId) => {
    const statusSequence = ['received', 'preparing', 'ready', 'on-the-way', 'delivered']
    let currentIndex = 0
    
    const interval = setInterval(() => {
      if (currentIndex < statusSequence.length) {
        updateOrderStatus(orderId, statusSequence[currentIndex])
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 30000) // Atualiza a cada 30 segundos (ajuste conforme necessário)
  }
  
  async function createOrder(orderData) {
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newOrder = {
        id: Math.floor(Math.random() * 9000) + 1000,
        ...orderData,
        status: 'received',
        createdAt: new Date().toISOString()
      }
      
      currentOrder.value = newOrder
      orderHistory.value.unshift(newOrder)
      
      return newOrder
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  }

  async function fetchOrder(orderId) {
    try {
      const response = await OrderService.getOrder(orderId)
      currentOrder.value = response.data
      if (response.data.status !== 'delivered') {
        startStatusUpdates(orderId)
      }
      return response.data
    } catch (error) {
      console.error('Error fetching order:', error)
      throw error
    }
  }

  async function updateOrderStatus(orderId, status) {
    try {
      await OrderService.updateStatus(orderId, status)
      if (currentOrder.value && currentOrder.value.id === orderId) {
        currentOrder.value.status = status
      }
      return true
    } catch (error) {
      console.error('Error updating order status:', error)
      throw error
    }
  }
  
  async function fetchOrderHistory(userId) {
    try {
      const response = await OrderService.getHistory(userId)
      orderHistory.value = response.data
      return response.data
    } catch (error) {
      console.error('Failed to fetch order history:', error)
      throw error
    }
  }
  
  return { currentOrder, orderHistory, deliveryPoints, createOrder, fetchOrderHistory , fetchOrder, orderStatuses ,updateOrderStatus }
})