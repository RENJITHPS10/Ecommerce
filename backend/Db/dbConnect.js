import mongoose from "mongoose";
import 'dotenv/config';


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;