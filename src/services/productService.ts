import API_ENDPOINTS from "@/components/config/api"

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS)
      if (!response.ok) throw new Error("Failed to fetch products")
      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("[v0] Error fetching products:", error)
      return []
    }
  },

  getProductById: async (id: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id))
      if (!response.ok) throw new Error("Failed to fetch product")
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("[v0] Error fetching product:", error)
      return null
    }
  },

  createProduct: async (productData: any) => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })
      if (!response.ok) throw new Error("Failed to create product")
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("[v0] Error creating product:", error)
      return null
    }
  },
}
