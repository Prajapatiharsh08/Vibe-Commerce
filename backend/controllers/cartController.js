import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Get user cart
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params
    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 })
      await cart.save()
    }

    res.status(200).json({
      success: true,
      data: cart,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params
    const { quantity } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    let cart = await Cart.findOne({ userId })
    if (!cart) {
      cart = new Cart({ userId, items: [] })
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity,
      })
    }

    // Calculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

    await cart.save()

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Update cart item
export const updateCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params
    const { quantity } = req.body

    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    const item = cart.items.find((item) => item.productId.toString() === productId)

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not in cart",
      })
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter((item) => item.productId.toString() !== productId)
    } else {
      item.quantity = quantity
    }

    // Calculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

    await cart.save()

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cart,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params

    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId)

    // Calculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

    await cart.save()

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      data: cart,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params

    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    cart.items = []
    cart.totalPrice = 0

    await cart.save()

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: cart,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
