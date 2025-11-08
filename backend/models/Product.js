import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [0, "Price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Please add an image URL"],
    },
    category: {
      type: String,
      enum: ["electronics", "clothing", "food", "home", "other"],
      default: "other",
    },
    stock: {
      type: Number,
      default: 100,
      min: [0, "Stock cannot be negative"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

export default mongoose.model("Product", ProductSchema)
