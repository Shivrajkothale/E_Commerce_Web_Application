import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const stored = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { items: [] }
  const [cart, setCart] = useState(stored)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, qty = 1) => {
    const exists = cart.items.find(i => i.product === product._id)
    let items
    if (exists) {
      items = cart.items.map(i => i.product === product._id ? { ...i, quantity: qty } : i)
    } else {
      items = [...cart.items, { product: product._id, name: product.name, price: product.price, quantity: qty }]
    }
    setCart({ items })
  }

  const removeFromCart = (productId) => {
    setCart({ items: cart.items.filter(i => i.product !== productId) })
  }

  const updateQty = (productId, qty) => {
    setCart({ items: cart.items.map(i => i.product === productId ? { ...i, quantity: qty } : i) })
  }

  const clearCart = () => setCart({ items: [] })

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
