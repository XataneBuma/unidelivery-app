import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Dados mockados completos
const mockSuppliers = [
  {
    id: 1,
    name: 'Lanchonete do Campus',
    description: 'Melhores lanches da universidade',
    category: 'Lanches',
    rating: 4.5,
    deliveryTime: '20-30 min',
    deliveryFee: 5.00,
    minOrder: 15.00,
    isOpen: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300',
    products: [
      {
        id: 101,
        name: 'X-Burger',
        description: 'Pão, hambúrguer, queijo, alface e tomate',
        price: 12.90,
        category: 'Lanches',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200'
      },
      {
        id: 102,
        name: 'X-Salada',
        description: 'Pão, hambúrguer, queijo, alface, tomate e maionese',
        price: 14.90,
        category: 'Lanches',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200'
      }
    ]
  },
  {
    id: 2,
    name: 'Pizzaria Universitária',
    description: 'Pizzas com preço acessível',
    category: 'Pizza',
    rating: 4.2,
    deliveryTime: '30-45 min',
    deliveryFee: 0,
    minOrder: 25.00,
    isOpen: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300',
    products: [
      {
        id: 201,
        name: 'Pizza Margherita',
        description: 'Molho de tomate, mussarela e manjericão',
        price: 29.90,
        category: 'Pizza',
        size: 'Média',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200'
      },
      {
        id: 202,
        name: 'Pizza Calabresa',
        description: 'Molho de tomate, mussarela e calabresa',
        price: 32.90,
        category: 'Pizza',
        size: 'Média',
        image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=200'
      }
    ]
  },
  {
    id: 3,
    name: 'Saudável & Leve',
    description: 'Comidas saudáveis e nutritivas',
    category: 'Saudável',
    rating: 4.7,
    deliveryTime: '15-25 min',
    deliveryFee: 3.50,
    minOrder: 20.00,
    isOpen: true,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300',
    products: [
      {
        id: 301,
        name: 'Bowl de Quinoa',
        description: 'Quinoa, abacate, tomate seco e mix de folhas',
        price: 18.90,
        category: 'Saudável',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'
      },
      {
        id: 302,
        name: 'Smoothie Energético',
        description: 'Banana, aveia, whey protein e leite vegetal',
        price: 12.50,
        category: 'Bebidas',
        image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=200'
      }
    ]
  },
  {
    id: 4,
    name: 'Doceria da Facul',
    description: 'Sobremesas e doces caseiros',
    category: 'Doces',
    rating: 4.8,
    deliveryTime: '20-40 min',
    deliveryFee: 4.00,
    minOrder: 12.00,
    isOpen: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=300',
    products: [
      {
        id: 401,
        name: 'Brigadeiro Gourmet',
        description: '6 unidades de brigadeiro gourmet',
        price: 15.00,
        category: 'Doces',
        image: 'https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?w=200'
      },
      {
        id: 402,
        name: 'Brownie de Chocolate',
        description: 'Brownie com nozes e calda de chocolate',
        price: 10.50,
        category: 'Doces',
        image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=200'
      }
    ]
  }
]

const mockProfile = {
  id: 1,
  name: 'Lanchonete do Campus',
  description: 'Melhores lanches da universidade',
  category: 'Lanches',
  rating: 4.5,
  deliveryTime: '20-30 min',
  deliveryFee: 5.00,
  minOrder: 15.00,
  isOpen: true,
  isFeatured: true,
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300',
}



async function getMenuItems() {
    await new Promise(resolve => setTimeout(resolve, 500))
    return [
      {
        id: 101,
        name: 'X-Burger',
        description: 'Pão, hambúrguer, queijo, alface e tomate',
        price: 12.90,
        category: 'Lanches',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200',
        available: true
      },
      {
        id: 102,
        name: 'X-Salada',
        description: 'Pão, hambúrguer, queijo, alface, tomate e maionese',
        price: 14.90,
        category: 'Lanches',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200',
        available: true
      }
    ]
  }

  async function getOrders() {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      data: [
        { 
          id: 101, 
          status: 'preparing', 
          total: 38.40, 
          items: [
            { id: 101, name: 'X-Burger', quantity: 1, price: 12.90 }, 
            { id: 102, name: 'X-Salada', quantity: 1, price: 14.90 }
          ],
          deliveryPoint: 'Prédio A - Sala 302',
          createdAt: '2025-04-23T10:30:00'
        },
        { 
          id: 102, 
          status: 'ready', 
          total: 25.90, 
          items: [
            { id: 101, name: 'X-Burger', quantity: 2, price: 12.90 }
          ],
          deliveryPoint: 'Prédio B - Recepção',
          createdAt: '2025-04-23T09:15:00'
        },
        { 
          id: 103, 
          status: 'delivered', 
          total: 44.40, 
          items: [
            { id: 101, name: 'X-Burger', quantity: 1, price: 12.90 }, 
            { id: 102, name: 'X-Salada', quantity: 2, price: 14.90 }
          ],
          deliveryPoint: 'Estacionamento - Vaga 15',
          createdAt: '2025-04-22T16:45:00'
        }
      ]
    }
  }
  
  // Mock das notificações
  async function getNotifications() {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      data: [
        { 
          id: 201, 
          message: 'Novo pedido recebido #101', 
          read: false,
          createdAt: '2025-04-23T10:35:00'
        },
        { 
          id: 202, 
          message: 'Seu perfil foi aprovado!', 
          read: false,
          createdAt: '2025-04-22T09:15:00'
        },
        { 
          id: 203, 
          message: 'Lembrete: Atualizar seu cardápio', 
          read: true,
          createdAt: '2025-04-21T16:45:00'
        }
      ]
    }
  }
  async function getProfile() {
    // Simula um delay de rede
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: mockProfile }
  }

  async function addMenuItem(itemData) {
    await new Promise(resolve => setTimeout(resolve, 800))
    const newItem = {
      id: Math.floor(Math.random() * 9000) + 1000,
      ...itemData,
      available: true
    }
    return newItem
  }
  
  async function updateMenuItem(id, itemData) {
    await new Promise(resolve => setTimeout(resolve, 800))
    return {
      id,
      ...itemData
    }
  }
  
  async function deleteMenuItem(id) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return true
  }

  async function updateOrderStatus(orderId, status) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { 
      data: { 
        success: true, 
        orderId, 
        status 
      } 
    }
  }

  async function markNotificationAsRead(notificationId) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { 
      data: { 
        success: true, 
        notificationId, 
        read: true 
      } 
    }
  }
export default {
  async getSuppliers() {
    // Simula um delay de rede
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: mockSuppliers }
  },
  

  async getSupplier(id) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const supplier = mockSuppliers.find(s => s.id === Number(id))
    return { data: supplier }
  },

  async getFeaturedSuppliers() {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: mockSuppliers.filter(s => s.isFeatured) }
  },

  async getSuppliersByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: mockSuppliers.filter(s => s.category === category) }
  },

  async createSupplier(supplierData) {
    // Implementação mock para desenvolvimento
    const newSupplier = {
      id: Math.max(...mockSuppliers.map(s => s.id)) + 1,
      ...supplierData,
      rating: 0,
      isOpen: true,
      isFeatured: false,
      products: []
    }
    mockSuppliers.push(newSupplier)
    return { data: newSupplier }
  },
  
  getProfile,
  getMenuItems,
  getOrders,
  getNotifications,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  updateOrderStatus,
  markNotificationAsRead
}