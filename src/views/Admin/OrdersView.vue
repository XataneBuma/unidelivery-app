<template>
    <div class="admin-view">
      <h2>Visualização de Pedidos</h2>
      <div class="order-actions">
        <input v-model="filter" @input="fetchOrders" placeholder="Filtrar por status, usuário ou fornecedor" />
      </div>
      <table class="order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Fornecedor</th>
            <th>Status</th>
            <th>Total</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.user }}</td>
            <td>{{ order.supplier }}</td>
            <td>{{ order.status }}</td>
            <td>MZN {{ order.total.toFixed(2) }}</td>
            <td>{{ order.createdAt }}</td>
            <td>
              <button @click="showDetails(order.id)">Detalhes</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="details" class="order-details-modal">
        <h3>Detalhes do Pedido #{{ details.id }}</h3>
        <p><b>Usuário:</b> {{ details.user }}</p>
        <p><b>Fornecedor:</b> {{ details.supplier }}</p>
        <p><b>Status:</b> {{ details.status }}</p>
        <p><b>Total:</b> MZN {{ details.total.toFixed(2) }}</p>
        <p><b>Data:</b> {{ details.createdAt }}</p>
        <p><b>Ponto de Entrega:</b> {{ details.deliveryPoint }}</p>
        <ul>
          <li v-for="item in details.items" :key="item.id">
            {{ item.name }} (x{{ item.quantity }}) - MZN {{ item.price.toFixed(2) }}
          </li>
        </ul>
        <button @click="details = null">Fechar</button>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue'
import OrderService from '@/services/order'

const orders = ref([])
const filter = ref('')
const details = ref(null)

async function fetchOrders() {
  const { data } = await OrderService.getOrdersAdmin(filter.value)
  orders.value = data
}

async function showDetails(orderId) {
  const { data } = await OrderService.getOrderDetails(orderId)
  details.value = data
}

fetchOrders()
  </script>