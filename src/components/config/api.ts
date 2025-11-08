const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const API_ENDPOINTS = {
  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_BY_ID: (id: string) => `${API_BASE_URL}/products/${id}`,

  // Cart endpoints
  GET_CART: (userId: string) => `${API_BASE_URL}/cart/${userId}`,
  ADD_TO_CART: (userId: string, productId: string) => `${API_BASE_URL}/cart/${userId}/${productId}`,
  UPDATE_CART_ITEM: (userId: string, productId: string) => `${API_BASE_URL}/cart/${userId}/${productId}`,
  REMOVE_FROM_CART: (userId: string, productId: string) => `${API_BASE_URL}/cart/${userId}/${productId}`,
  CLEAR_CART: (userId: string) => `${API_BASE_URL}/cart/${userId}`,

  // Order endpoints
  CREATE_ORDER: `${API_BASE_URL}/orders`,
  GET_ALL_ORDERS: `${API_BASE_URL}/orders`,
  GET_ORDER_BY_ID: (id: string) => `${API_BASE_URL}/orders/${id}`,
  GET_ORDERS_BY_EMAIL: (email: string) => `${API_BASE_URL}/orders/email/${email}`,
}

export default API_ENDPOINTS
