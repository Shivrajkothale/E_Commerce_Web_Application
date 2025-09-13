import React, { createContext, useState, useEffect } from 'react'
import api from '../api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const stored = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  const [user, setUser] = useState(stored)

  useEffect(() => {
    if (user?.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }, [user])

  const login = async (email, password) => {
    const { data } = await api.post('/users/login', { email, password })
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }

  const register = async (name, email, password) => {
    const { data } = await api.post('/users/register', { name, email, password })
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
