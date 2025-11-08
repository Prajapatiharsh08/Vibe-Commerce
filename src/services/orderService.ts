import API_ENDPOINTS from "@/components/config/api"

export const orderService = {
  createOrder: async (userId: string, customerName: string, customerEmail: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.CREATE_ORDER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          customerName,
          customerEmail,
        }),
      })
      if (!response.ok) throw new Error("Failed to create order")
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("[v0] Error creating order:", error)
      return null
    }
  },

  getAllOrders: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_ALL_ORDERS)
      if (!response.ok) throw new Error("Failed to fetch orders")
      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("[v0] Error fetching orders:", error)
      return []
    }
  },

  getOrderById: async (id: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_ORDER_BY_ID(id))
      if (!response.ok) throw new Error("Failed to fetch order")
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("[v0] Error fetching order:", error)
      return null
    }
  },

  getOrdersByEmail: async (email: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_ORDERS_BY_EMAIL(email))
      if (!response.ok) throw new Error("Failed to fetch orders")
      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("[v0] Error fetching orders:", error)
      return []
    }
  },
}
