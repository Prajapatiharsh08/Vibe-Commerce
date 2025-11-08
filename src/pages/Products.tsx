"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard"
import { motion } from "framer-motion"
import { mockProducts } from "@/data/products"
import { productService } from "@/services/productService"

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const backendProducts = await productService.getAllProducts()

        if (backendProducts && backendProducts.length > 0) {
          const mappedProducts = backendProducts.map((product: any) => ({
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
          }))
          setProducts(mappedProducts)
          localStorage.setItem("vibeProducts", JSON.stringify(mappedProducts))
        } else {
          // Use mock data if backend returns empty
          const savedProducts = localStorage.getItem("vibeProducts")
          if (savedProducts) {
            setProducts(JSON.parse(savedProducts))
          } else {
            setProducts(mockProducts)
            localStorage.setItem("vibeProducts", JSON.stringify(mockProducts))
          }
        }
      } catch (error) {
        console.error("[v0] Error fetching products:", error)
        // Fallback to localStorage or mock data
        const savedProducts = localStorage.getItem("vibeProducts")
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts))
        } else {
          setProducts(mockProducts)
          localStorage.setItem("vibeProducts", JSON.stringify(mockProducts))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of premium products
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No products available yet. Add some products to get started!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Products
