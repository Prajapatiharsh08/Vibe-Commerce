import mongoose from "mongoose"

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        image: String,
        description: String,
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

export default mongoose.model("Cart", CartSchema)
