import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("[v0] MongoDB connected successfully")
  } catch (error) {
    console.error("[v0] MongoDB connection error:", error.message)
    process.exit(1)
  }
}

export default connectDB
