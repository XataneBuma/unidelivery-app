<template>
    <div class="admin-view">
      <h2>Configurações do Sistema</h2>
      <form class="settings-form" @submit.prevent="saveSettings">
        <div class="form-group">
          <label>Horário de Funcionamento</label>
          <input v-model="settings.operatingHours" placeholder="Ex: 08:00 - 22:00" />
        </div>
        <div class="form-group">
          <label>Taxa de Entrega Padrão (MZN)</label>
          <input v-model.number="settings.defaultDeliveryFee" type="number" min="0" />
        </div>
        <div class="form-group">
          <label>Mensagem do Sistema</label>
          <textarea v-model="settings.systemMessage" rows="2" />
        </div>
        <button type="submit">Salvar Configurações</button>
      </form>
      <div v-if="saved" class="saved-message">Configurações salvas!</div>
      <CampusManager />
    </div>
  </template>
  
  <script setup>
import { ref, reactive } from 'vue'
import CampusManager from '@/components/admin/CampusManager.vue'

const settings = reactive({
  operatingHours: '08:00 - 22:00',
  defaultDeliveryFee: 5,
  systemMessage: 'Bem-vindo ao sistema de delivery do campus!'
})
const saved = ref(false)

function saveSettings() {
  saved.value = true
  setTimeout(() => (saved.value = false), 2000)
}
  </script>