import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import SupplierService from '@/services/supplier'


export const useSupplierStore = defineStore('supplier', () => {
  const suppliers = ref([])
  const currentSupplier = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  
  // Novas propriedades necessárias para o dashboard
  const menuItems = ref([])
  const orders = ref([])
  const notifications = ref([])

  const featuredSuppliers = computed(() => {
    return suppliers.value.filter(supplier => supplier.isFeatured)
  })

  const categories = computed(() => {
    const allCategories = suppliers.value.map(supplier => supplier.category)
    return [...new Set(allCategories)]
  })

  async function fetchSuppliers() {
    try {
      isLoading.value = true
      error.value = null
      const response = await SupplierService.getSuppliers()
      suppliers.value = response.data
    } catch (err) {
      error.value = err.message || 'Falha ao carregar fornecedores'
      console.error('Error fetching suppliers:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchFeaturedSuppliers() {
    try {
      isLoading.value = true
      const response = await SupplierService.getFeaturedSuppliers()
      return response.data
    } catch (err) {
      error.value = err.message || 'Falha ao carregar fornecedores em destaque'
      console.error('Error fetching featured suppliers:', err)
      return []
    } finally {
      isLoading.value = false
    }
  }

  async function fetchSupplierById(id) {
    try {
      isLoading.value = true
      error.value = null
      const response = await SupplierService.getSupplier(id)
      currentSupplier.value = response.data
      return response.data
    } catch (err) {
      error.value = err.message || `Falha ao carregar fornecedor com ID ${id}`
      console.error('Error fetching supplier:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchSuppliersByCategory(category) {
    try {
      isLoading.value = true
      const response = await SupplierService.getSuppliersByCategory(category)
      return response.data
    } catch (err) {
      error.value = `Falha ao carregar fornecedores de ${category}`
      console.error(`Error fetching ${category} suppliers:`, err)
      return []
    } finally {
      isLoading.value = false
    }
  }

  async function fetchSupplierProfile() {
    try {
      isLoading.value = true
      const response = await SupplierService.getProfile()
      currentSupplier.value = response.data
      
      // Além de atualizar o currentSupplier, também vamos buscar
      // os dados necessários para o dashboard
      if (response.data) {
        // Supondo que estes dados venham da API ou estejam incluídos na resposta
        // do perfil. Se não estiverem, seriam necessárias chamadas separadas.
        await fetchMenuItems()
        await fetchOrders()
        await fetchNotifications()
      }
      
      return response.data
    } catch (err) {
      error.value = err.message || 'Failed to fetch profile'
      throw err
    } finally {
      isLoading.value = false
    }
  }
  
  // Novos métodos necessários para o dashboard
  async function fetchMenuItems() {
    try {
      const response = await SupplierService.getMenuItems()
      menuItems.value = response.data || []
    } catch (err) {
      console.error('Error fetching menu items:', err)
      menuItems.value = []
    }
  }
  
  async function fetchOrders() {
    try {
      const response = await SupplierService.getOrders()
      orders.value = response.data || []
    } catch (err) {
      console.error('Error fetching orders:', err)
      orders.value = []
    }
  }
  
  async function fetchNotifications() {
    try {
      const response = await SupplierService.getNotifications()
      notifications.value = response.data || []
    } catch (err) {
      console.error('Error fetching notifications:', err)
      notifications.value = []
    }
  }
  
  async function updateOrderStatus(orderId, status) {
    try {
      isLoading.value = true
      await SupplierService.updateOrderStatus(orderId, status)
      
      // Atualiza o pedido localmente
      const orderIndex = orders.value.findIndex(o => o.id === orderId)
      if (orderIndex !== -1) {
        orders.value[orderIndex].status = status
      }
      
      return true
    } catch (err) {
      error.value = `Falha ao atualizar status do pedido #${orderId}`
      console.error('Error updating order status:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  function markNotificationAsRead(notificationId) {
    try {
      // Chamar API se necessário
      SupplierService.markNotificationAsRead(notificationId)
      
      // Atualiza localmente
      const notifIndex = notifications.value.findIndex(n => n.id === notificationId)
      if (notifIndex !== -1) {
        notifications.value[notifIndex].read = true
      }
    } catch (err) {
      console.error('Error marking notification as read:', err)
    }
  }

  return {
    suppliers,
    currentSupplier,
    featuredSuppliers,
    categories,
    isLoading,
    error,
    // Exportando as novas propriedades
    menuItems,
    orders,
    notifications,
    // Métodos existentes
    fetchSuppliers,
    fetchFeaturedSuppliers,
    fetchSupplierById,
    fetchSuppliersByCategory,
    fetchSupplierProfile,
    // Novos métodos
    updateOrderStatus,
    markNotificationAsRead
  }
})