import express from "express"
import { createOrder, getAllOrders, getOrderById, getOrdersByEmail } from "../controllers/orderController.js"

const router = express.Router()

router.post("/", createOrder)
router.get("/", getAllOrders)
router.get("/:id", getOrderById)
router.get("/email/:email", getOrdersByEmail)

export default router
