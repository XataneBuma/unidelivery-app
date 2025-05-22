<template>
    <div class="supplier-profile">
      <h1>Meu Perfil</h1>
      
      <div class="profile-container">
        <div class="profile-header">
          <div class="profile-image">
            <img :src="supplier.image" :alt="supplier.name">
            <button @click="showImageUpload = true" class="btn-change-image">
              <font-awesome-icon icon="camera" />
            </button>
          </div>
          <div class="profile-info">
            <h2>{{ supplier.name }}</h2>
            <div class="profile-status" :class="supplier.status">
              {{ getStatusText(supplier.status) }}
            </div>
          </div>
        </div>
        
        <form @submit.prevent="saveProfile" class="profile-form">
          <div class="form-section">
            <h3>Informações Básicas</h3>
            <div class="form-group">
              <label>Nome do Estabelecimento</label>
              <input v-model="form.name" type="text" required>
            </div>
            <div class="form-group">
              <label>E-mail</label>
              <input v-model="form.email" type="email" required>
            </div>
            <div class="form-group">
              <label>Telefone</label>
              <input v-model="form.phone" type="tel" required>
            </div>
            <div class="form-group">
              <label>Especialidades</label>
              <select v-model="form.specialties" multiple>
                <option value="vegan">Vegano</option>
                <option value="vegetarian">Vegetariano</option>
                <option value="gluten-free">Sem Glúten</option>
                <option value="lactose-free">Sem Lactose</option>
                <option value="quick">Refeição Rápida</option>
                <option value="healthy">Saudável</option>
              </select>
              <small class="form-hint">Selecione todas que se aplicam</small>
            </div>
          </div>
          
          <div class="form-section">
            <h3>Documentação</h3>
            <div class="form-group">
              <label>CNPJ</label>
              <input v-model="form.document" type="text" disabled>
              <small class="form-hint">Documento verificado</small>
            </div>
          </div>
          
          <div class="form-section">
            <h3>Áreas de Entrega no Campus</h3>
            <div class="delivery-areas">
              <div v-for="area in deliveryAreas" :key="area.id" class="delivery-area">
                <label class="area-toggle">
                  <input 
                    type="checkbox" 
                    v-model="area.active"
                    @change="updateDeliveryAreas"
                  >
                  <span class="slider"></span>
                  {{ area.name }}
                </label>
              </div>
            </div>
            <small class="form-hint">Selecione os prédios/setores do campus onde realiza entregas</small>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-save">Salvar Alterações</button>
          </div>
        </form>
      </div>
      
      <!-- Modal para upload de imagem -->
      <div v-if="showImageUpload" class="modal-overlay">
        <div class="modal-content">
          <h2>Alterar Imagem</h2>
          <div class="image-upload">
            <div class="upload-preview">
              <img :src="imagePreview || supplier.image" :alt="supplier.name">
            </div>
            <input 
              type="file" 
              accept="image/*" 
              @change="handleImageUpload"
              ref="fileInput"
            >
            <div class="upload-actions">
              <button type="button" @click="showImageUpload = false" class="btn-cancel">
                Cancelar
              </button>
              <button 
                type="button" 
                @click="saveImage" 
                class="btn-confirm"
                :disabled="!imageFile"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useSupplierStore } from '@/stores/supplier'
  
  const supplierStore = useSupplierStore()
  const supplier = computed(() => supplierStore.currentSupplier)
  const deliveryAreas = computed(() => [...supplierStore.deliveryAreas])
  
  const form = ref({
    name: '',
    email: '',
    phone: '',
    document: ''
  })
  
  const showImageUpload = ref(false)
  const imageFile = ref(null)
  const imagePreview = ref(null)
  const fileInput = ref(null)
  
  onMounted(async () => {
    await supplierStore.fetchSupplierProfile()
    form.value = {
      name: supplier.value.name,
      email: supplier.value.email,
      phone: supplier.value.phone,
      document: supplier.value.document
    }
  })
  
  function getStatusText(status) {
    const statusMap = {
      'verified': 'Verificado',
      'pending': 'Em Análise',
      'rejected': 'Rejeitado'
    }
    return statusMap[status] || status
  }
  
  async function saveProfile() {
    try {
      await supplierStore.updateProfile(form.value)
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }
  
  async function updateDeliveryAreas() {
    try {
      await supplierStore.updateDeliveryAreas(deliveryAreas.value)
    } catch (error) {
      console.error('Error updating delivery areas:', error)
    }
  }
  
  function handleImageUpload(event) {
    const file = event.target.files[0]
    if (file) {
      imageFile.value = file
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.value = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  
  async function saveImage() {
    try {
      // Simular upload da imagem
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Atualizar a imagem do fornecedor
      supplierStore.currentSupplier.image = imagePreview.value
      showImageUpload.value = false
      imageFile.value = null
      imagePreview.value = null
      fileInput.value.value = ''
    } catch (error) {
      console.error('Error saving image:', error)
    }
  }
  </script>
  
  <style scoped>
  .supplier-profile {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .profile-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 25px;
  }
  
  .profile-header {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #eee;
  }
  
  .profile-image {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .btn-change-image {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 36px;
    height: 36px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .profile-info h2 {
    margin: 0 0 10px 0;
  }
  
  .profile-status {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .profile-status.verified {
    background-color: #d4edda;
    color: #155724;
  }
  
  .profile-status.pending {
    background-color: #fff3cd;
    color: #856404;
  }
  
  .profile-status.rejected {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  .profile-form {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .form-section {
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
  }
  
  .form-section h3 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }
  
  .form-group input {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .form-hint {
    color: #6c757d;
    font-size: 0.8rem;
  }
  
  .delivery-areas {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
  
  .delivery-area {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .area-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  
  .slider {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
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
  
  input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  input:checked + .slider {
    background-color: #42b983;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  .form-actions {
    text-align: right;
  }
  
  .btn-save {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
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
  }
  
  .modal-content h2 {
    margin-top: 0;
  }
  
  .image-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .upload-preview {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px dashed #ddd;
  }
  
  .upload-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .upload-actions {
    display: flex;
    gap: 15px;
  }
  
  .btn-cancel {
    padding: 8px 15px;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-confirm {
    padding: 8px 15px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-confirm:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  </style>