"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import { productService } from "@/services/productService"

const AddProduct = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "other",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.price || !formData.image.trim() || !formData.description.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    const price = Number.parseFloat(formData.price)
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price")
      return
    }

    setLoading(true)

    try {
      const newProduct = await productService.createProduct({
        name: formData.name,
        price: price,
        image: formData.image,
        description: formData.description,
        category: formData.category,
        stock: 100,
      })

      if (newProduct) {
        toast.success("Product added successfully!")
        navigate("/products")
      }
    } catch (error) {
      console.error("[v0] Error adding product:", error)
      toast.error("Failed to add product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Add New Product</h1>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Premium Wireless Headphones"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="299.99"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  >
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="food">Food</option>
                    <option value="home">Home</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                  {formData.image && (
                    <div className="mt-2 border border-border rounded-lg overflow-hidden">
                      <img
                        src={formData.image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="High-quality wireless headphones with noise cancellation"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" size="lg" className="flex-1" disabled={loading}>
                    {loading ? "Adding..." : "Add Product"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/products")}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default AddProduct
