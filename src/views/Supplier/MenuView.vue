<template>
    <div class="menu-management">
      <div class="page-header">
        <h1>Gerenciamento de Menu</h1>
        <button @click="showAddItemModal = true" class="btn-add-item">
          <font-awesome-icon icon="plus" />
          Adicionar Item
        </button>
      </div>
  
      <div class="menu-items">
        <div v-for="item in menuItems" :key="item.id" class="menu-item-card">
          <div class="item-image">
            <img :src="item.image" :alt="item.name">
          </div>
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-description">{{ item.description }}</p>
            <p class="item-price">MZN {{ item.price.toFixed(2) }}</p>
            <div class="item-category">{{ item.category }}</div>
          </div>
          <div class="item-actions">
            <button @click="openEditModal(item)" class="btn-edit">
              <font-awesome-icon icon="edit" />
            </button>
            <button @click="confirmDelete(item.id)" class="btn-delete">
              <font-awesome-icon icon="trash" />
            </button>
            <label class="toggle-availability">
              <input 
                type="checkbox" 
                :checked="item.available" 
                @change="toggleAvailability(item.id, $event.target.checked)"
              >
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
  
      <!-- Modal para adicionar/editar item -->
      <div v-if="showAddItemModal || currentItem" class="modal-overlay">
        <div class="modal-content">
          <h2>{{ currentItem ? 'Editar Item' : 'Adicionar Novo Item' }}</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label>Nome</label>
              <input v-model="form.name" type="text" required>
            </div>
            <div class="form-group">
              <label>Descrição</label>
              <textarea v-model="form.description" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Preço</label>
              <input v-model="form.price" type="number" step="0.01" min="0" required>
            </div>
            <div class="form-group">
              <label>Categoria</label>
              <select v-model="form.category" required>
                <option value="Lanches">Lanches</option>
                <option value="Pizza">Pizza</option>
                <option value="Saudável">Saudável</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Doces">Doces</option>
              </select>
            </div>
            <div class="form-group">
              <label>Imagem (URL)</label>
              <input v-model="form.image" type="text" placeholder="Cole a URL da imagem">
            </div>
            <div class="form-actions">
              <button type="button" @click="closeModal" class="btn-cancel">Cancelar</button>
              <button type="submit" class="btn-submit">
                {{ currentItem ? 'Atualizar' : 'Adicionar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Modal de confirmação -->
      <div v-if="showConfirmModal" class="modal-overlay">
        <div class="confirm-modal">
          <p>Tem certeza que deseja excluir este item?</p>
          <div class="confirm-actions">
            <button @click="showConfirmModal = false" class="btn-cancel">Cancelar</button>
            <button @click="deleteItem" class="btn-confirm">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useSupplierStore } from '@/stores/supplier'
  
  const supplierStore = useSupplierStore()
  const menuItems = computed(() => supplierStore.menuItems)
  
  const showAddItemModal = ref(false)
  const showConfirmModal = ref(false)
  const currentItem = ref(null)
  const itemToDelete = ref(null)
  
  const form = ref({
    name: '',
    description: '',
    price: 0,
    category: 'Lanches',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'
  })
  
  onMounted(async () => {
    await supplierStore.fetchSupplierProfile()
  })
  
  function openEditModal(item) {
    currentItem.value = { ...item }
    form.value = { ...item }
    showAddItemModal.value = true
  }
  
  function closeModal() {
    showAddItemModal.value = false
    currentItem.value = null
    resetForm()
  }
  
  function resetForm() {
    form.value = {
      name: '',
      description: '',
      price: 0,
      category: 'Lanches',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'
    }
  }
  
  async function handleSubmit() {
    try {
      if (currentItem.value) {
        await supplierStore.updateMenuItem(currentItem.value.id, form.value)
      } else {
        await supplierStore.addMenuItem(form.value)
      }
      closeModal()
    } catch (error) {
      console.error('Error saving menu item:', error)
    }
  }
  
  function confirmDelete(id) {
    itemToDelete.value = id
    showConfirmModal.value = true
  }
  
  async function deleteItem() {
    try {
      await supplierStore.deleteMenuItem(itemToDelete.value)
      showConfirmModal.value = false
      itemToDelete.value = null
    } catch (error) {
      console.error('Error deleting menu item:', error)
    }
  }
  
  async function toggleAvailability(id, available) {
    try {
      await supplierStore.updateMenuItem(id, { available })
    } catch (error) {
      console.error('Error toggling availability:', error)
    }
  }
  </script>
  
  <style scoped>
  .menu-management {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .btn-add-item {
    padding: 10px 15px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .menu-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .menu-item-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .item-image {
    height: 180px;
    overflow: hidden;
  }
  
  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .item-details {
    padding: 15px;
    flex-grow: 1;
  }
  
  .item-details h3 {
    margin: 0 0 8px 0;
  }
  
  .item-description {
    color: #666;
    font-size: 0.9rem;
    margin: 8px 0;
  }
  
  .item-price {
    font-weight: bold;
    color: #42b983;
    margin: 8px 0;
  }
  
  .item-category {
    display: inline-block;
    padding: 3px 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
    font-size: 0.8rem;
    color: #555;
  }
  
  .item-actions {
    padding: 10px 15px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    border-top: 1px solid #eee;
  }
  
  .btn-edit, .btn-delete {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .btn-edit {
    color: #17a2b8;
  }
  
  .btn-delete {
    color: #dc3545;
  }
  
  .toggle-availability {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }
  
  .toggle-availability input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #42b983;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 25px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .modal-content h2 {
    margin-top: 0;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
  
  .btn-cancel {
    padding: 8px 15px;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-submit {
    padding: 8px 15px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .confirm-modal {
    background-color: white;
    padding: 25px;
    border-radius: 8px;
    text-align: center;
  }
  
  .confirm-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
  }
  
  .btn-confirm {
    padding: 8px 15px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>