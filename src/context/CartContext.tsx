"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import type { Product, CartItem } from "@/types/product"
import { toast } from "react-hot-toast"
import { cartService } from "@/services/cartService"

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const getUserId = () => {
  let userId = localStorage.getItem("userId")
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem("userId", userId)
  }
  return userId
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("vibeCart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  const userId = getUserId()

  useEffect(() => {
    const syncCart = async () => {
      const backendCart = await cartService.getCart(userId)
      if (backendCart && backendCart.items && backendCart.items.length > 0) {
        const items = backendCart.items.map((item: any) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          quantity: item.quantity,
        }))
        setCart(items)
        localStorage.setItem("vibeCart", JSON.stringify(items))
      }
    }
    syncCart()
  }, [userId])

  useEffect(() => {
    localStorage.setItem("vibeCart", JSON.stringify(cart))
  }, [cart])

  const addToCart = async (product: Product) => {
    try {
      const quantity = 1
      const updatedCart = await cartService.addToCart(userId, product.id, quantity)

      if (updatedCart) {
        const items = updatedCart.items.map((item: any) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          quantity: item.quantity,
        }))
        setCart(items)
        toast.success(`${product.name} added to cart!`)
      }
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
      // Fallback to local state
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id)
        if (existingItem) {
          toast.success(`Increased quantity of ${product.name}`)
          return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        }
        toast.success(`${product.name} added to cart!`)
        return [...prevCart, { ...product, quantity: 1 }]
      })
    }
  }

  const removeFromCart = async (productId: string) => {
    try {
      const item = cart.find((item) => item.id === productId)
      const updatedCart = await cartService.removeFromCart(userId, productId)

      if (updatedCart) {
        const items = updatedCart.items.map((item: any) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          quantity: item.quantity,
        }))
        setCart(items)
        if (item) {
          toast.success(`${item.name} removed from cart`)
        }
      }
    } catch (error) {
      console.error("[v0] Error removing from cart:", error)
      // Fallback to local state
      const item = cart.find((item) => item.id === productId)
      if (item) {
        toast.success(`${item.name} removed from cart`)
      }
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    try {
      const updatedCart = await cartService.updateCartItem(userId, productId, quantity)
      if (updatedCart) {
        const items = updatedCart.items.map((item: any) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          quantity: item.quantity,
        }))
        setCart(items)
      }
    } catch (error) {
      console.error("[v0] Error updating quantity:", error)
      // Fallback to local state
      setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const clearCart = async () => {
    try {
      await cartService.clearCart(userId)
      setCart([])
      localStorage.removeItem("vibeCart")
    } catch (error) {
      console.error("[v0] Error clearing cart:", error)
      // Fallback to local state
      setCart([])
      localStorage.removeItem("vibeCart")
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
