<template>
    <div class="admin-view">
      <h2>Gerenciamento de Usuários</h2>
      <div class="user-actions">
        <input v-model="search" @input="fetchUsers" placeholder="Buscar por nome ou email" />
      </div>
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Papel</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>
              <span v-if="editId !== user.id">{{ user.name }}</span>
              <input v-else v-model="editUser.name" />
            </td>
            <td>
              <span v-if="editId !== user.id">{{ user.email }}</span>
              <input v-else v-model="editUser.email" />
            </td>
            <td>
              <span v-if="editId !== user.id">{{ user.role }}</span>
              <select v-else v-model="editUser.role">
                <option value="student">Estudante</option>
                <option value="supplier">Fornecedor</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td>
              <span :class="user.active ? 'active' : 'inactive'">
                {{ user.active ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
            <td>
              <button v-if="editId !== user.id" @click="startEdit(user)">Editar</button>
              <button v-else @click="saveEdit">Salvar</button>
              <button v-if="editId === user.id" @click="cancelEdit">Cancelar</button>
              <button @click="deleteUser(user.id)" class="delete-btn">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
import { ref, reactive } from 'vue'
import AuthService from '@/services/auth'

const users = ref([])
const search = ref('')
const editId = ref(null)
const editUser = reactive({ id: null, name: '', email: '', role: '', active: true })

async function fetchUsers() {
  const { data } = await AuthService.getUsers(search.value)
  users.value = data
}

function startEdit(user) {
  editId.value = user.id
  Object.assign(editUser, user)
}

async function saveEdit() {
  await AuthService.updateUser(editUser.id, editUser)
  editId.value = null
  await fetchUsers()
}

function cancelEdit() {
  editId.value = null
}

async function deleteUser(id) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    await AuthService.deleteUser(id)
    await fetchUsers()
  }
}

fetchUsers()
  </script>