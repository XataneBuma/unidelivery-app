import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export default {

  
  async create(orderData) {
    // Implementação mock para desenvolvimento
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { 
      data: {
        id: Math.floor(Math.random() * 9000) + 1000,
        ...orderData,
        status: 'Recebido',
        createdAt: new Date().toISOString()
      }
    }
  },

  async getHistory(userId) {
    await new Promise(resolve => setTimeout(resolve, 800))
    // Retorna mock data - na implementação real, filtraria por userId
    return { 
      data: [
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
    }
  },
  async getOrder(orderId) {
    // Substitua por chamada real à API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock data - substitua por dados reais da API
    const mockOrder = {
      id: orderId,
      items: [
        { id: 101, name: 'X-Burger', price: 12.90, quantity: 2 },
        { id: 102, name: 'Refrigerante', price: 5.00, quantity: 1 }
      ],
      total: 30.80,
      status: 'received',
      deliveryPoint: 'Bloco A - Entrada Principal',
      createdAt: new Date().toISOString()
    }
    
    return { data: mockOrder }
  },
  
  async updateStatus(orderId, status) {
    // Substitua por chamada real à API
    await new Promise(resolve => setTimeout(resolve, 500))
    return { success: true }
  }

  
}