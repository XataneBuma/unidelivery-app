<template>
    <div class="admin-view">
      <h2>Gerenciamento de Fornecedores</h2>
      <div class="supplier-actions">
        <input v-model="search" @input="fetchSuppliers" placeholder="Buscar por nome ou email" />
      </div>
      <table class="supplier-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Aprovado</th>
            <th>Bloqueado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="supplier in suppliers" :key="supplier.id">
            <td>{{ supplier.id }}</td>
            <td>
              <span v-if="editId !== supplier.id">{{ supplier.name }}</span>
              <input v-else v-model="editSupplier.name" />
            </td>
            <td>
              <span v-if="editId !== supplier.id">{{ supplier.email }}</span>
              <input v-else v-model="editSupplier.email" />
            </td>
            <td>
              <span>{{ supplier.approved ? 'Sim' : 'Não' }}</span>
              <button v-if="!supplier.approved" @click="approveSupplier(supplier.id)">Aprovar</button>
            </td>
            <td>
              <span>{{ supplier.blocked ? 'Sim' : 'Não' }}</span>
              <button @click="toggleBlock(supplier)">{{ supplier.blocked ? 'Desbloquear' : 'Bloquear' }}</button>
            </td>
            <td>
              <button v-if="editId !== supplier.id" @click="startEdit(supplier)">Editar</button>
              <button v-else @click="saveEdit">Salvar</button>
              <button v-if="editId === supplier.id" @click="cancelEdit">Cancelar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
import { ref, reactive } from 'vue'
import SupplierService from '@/services/supplier'

const suppliers = ref([])
const search = ref('')
const editId = ref(null)
const editSupplier = reactive({ id: null, name: '', email: '', approved: false, blocked: false })

async function fetchSuppliers() {
  const { data } = await SupplierService.getSuppliersAdmin(search.value)
  suppliers.value = data
}

function startEdit(supplier) {
  editId.value = supplier.id
  Object.assign(editSupplier, supplier)
}

async function saveEdit() {
  await SupplierService.updateSupplier(editSupplier.id, editSupplier)
  editId.value = null
  await fetchSuppliers()
}

function cancelEdit() {
  editId.value = null
}

async function approveSupplier(id) {
  await SupplierService.approveSupplier(id)
  await fetchSuppliers()
}

async function toggleBlock(supplier) {
  await SupplierService.blockSupplier(supplier.id, !supplier.blocked)
  await fetchSuppliers()
}

fetchSuppliers()
  </script>