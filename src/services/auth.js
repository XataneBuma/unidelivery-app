// Mocked users for admin management
const mockUsers = [
  { id: 1, name: 'Alice', email: 'alice@univ.edu', role: 'student', active: true },
  { id: 2, name: 'Bob', email: 'bob@univ.edu', role: 'supplier', active: true },
  { id: 3, name: 'Carol', email: 'carol@univ.edu', role: 'admin', active: true },
  { id: 4, name: 'David', email: 'david@univ.edu', role: 'student', active: false },
]

const getUsers = async (search = '') => {
  await new Promise(resolve => setTimeout(resolve, 300))
  if (!search) return { data: mockUsers }
  return { data: mockUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) }
}

const updateUser = async (id, userData) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { data: { ...userData, id } }
}

const deleteUser = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { success: true }
}
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials)
  return response.data
}

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData)
  return response.data
}

const logout = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data
}

const checkAuth = async () => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data
}

export default {
  login,
  register,
  logout,
  checkAuth
  ,getUsers
  ,updateUser
  ,deleteUser
}