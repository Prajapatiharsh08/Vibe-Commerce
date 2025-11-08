import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config({ path: ".env.local" })

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to database
connectDB()

// Routes
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`[v0] Server running on port ${PORT}`)
})

export default app
