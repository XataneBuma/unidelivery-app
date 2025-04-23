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
}