"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CheckoutModal from "@/components/CheckoutModal"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import { orderService } from "@/services/orderService"

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, getTotalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const total = getTotalPrice()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty")
      navigate("/products")
      return
    }

    setLoading(true)

    try {
      const userId = localStorage.getItem("userId") || "guest"
      const createdOrder = await orderService.createOrder(userId, name, email)

      if (createdOrder) {
        setOrder(createdOrder)
        setShowModal(true)
      } else {
        throw new Error("Failed to create order")
      }
    } catch (error) {
      console.error("[v0] Error creating order:", error)
      toast.error("Failed to process order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleModalClose = async () => {
    setShowModal(false)
    await clearCart()
    setName("")
    setEmail("")
    toast.success("Order completed successfully!")
    navigate("/products")
  }

  if (cart.length === 0 && !showModal) {
    navigate("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Checkout</h1>

          <div className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-6" disabled={loading}>
                    {loading ? "Processing..." : `Complete Purchase - $${total.toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      <CheckoutModal
        isOpen={showModal}
        onClose={handleModalClose}
        totalAmount={total}
        customerName={name}
        customerEmail={email}
        orderNumber={order?.orderNumber}
      />
    </div>
  )
}

export default Checkout
