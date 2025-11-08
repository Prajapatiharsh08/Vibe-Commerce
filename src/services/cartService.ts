import API_ENDPOINTS from "@/components/config/api"

export const cartService = {
  getCart: async (userId: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_CART(userId))
      if (!response.ok) throw new Error("Failed to fetch cart")
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("[v0] Error fetching cart:", error)
      return null
    }
  },

  addToCart: async (userId: string, productId: string, quantity: number) => {
    try {
      const response = await fetch(API_ENDPOINTS.ADD_TO_CART(userId, productId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      })
      if (!response.ok) throw new Error("Failed to add to cart")
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
      return null
    }
  },

  updateCartItem: async (userId: string, productId: string, quantity: number) => {
    try {
      const response = await fetch(API_ENDPOINTS.UPDATE_CART_ITEM(userId, productId), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      })
      if (!response.ok) throw new Error("Failed to update cart")
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("[v0] Error updating cart:", error)
      return null
    }
  },

  removeFromCart: async (userId: string, productId: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.REMOVE_FROM_CART(userId, productId), {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to remove from cart")
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("[v0] Error removing from cart:", error)
      return null
    }
  },

  clearCart: async (userId: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.CLEAR_CART(userId), {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to clear cart")
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("[v0] Error clearing cart:", error)
      return null
    }
  },
}
