import Order from "../models/Order.js";
import Cart from "../models/Cart.js"
import { v4 as uuidv4 } from "uuid"

// Create order
export const createOrder = async (req, res) => {
  try {
    const { userId, customerName, customerEmail } = req.body

    const cart = await Cart.findOne({ userId })
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      })
    }

    const orderNumber = `ORD-${uuidv4().slice(0, 8).toUpperCase()}`

    const order = new Order({
      orderNumber,
      customerName,
      customerEmail,
      items: cart.items,
      totalAmount: cart.totalPrice,
      status: "pending",
      paymentStatus: "completed",
    })

    await order.save()

    // Clear cart after order
    cart.items = []
    cart.totalPrice = 0
    await cart.save()

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      })
    }

    res.status(200).json({
      success: true,
      data: order,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get orders by email
export const getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params
    const orders = await Order.find({ customerEmail: email }).sort({
      createdAt: -1,
    })

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
