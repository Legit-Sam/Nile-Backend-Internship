import mongoose from "mongoose"


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB Connected')
    } catch (error) {
        console.log("Error Connecting to Database:", error)
    }
}