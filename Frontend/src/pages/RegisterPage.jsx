import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const { register } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await register(name, email, password)
      alert('Account created successfully ✅')
      nav('/') // redirect to homepage
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  const cardStyle = {
    maxWidth: 400,
    margin: '40px auto',
    padding: '32px 24px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box'
  }

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    marginTop: '16px',
    background: 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.2s'
  }

  const headingStyle = {
    marginBottom: '24px',
    color: '#007bff',
    fontWeight: 700,
    fontSize: '2rem'
  }

  return (
    <div style={cardStyle}>
      <h2 style={headingStyle}>Sign Up</h2>
      <form onSubmit={submit} style={{ width: '100%' }}>
        <input
          style={inputStyle}
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  )
}
