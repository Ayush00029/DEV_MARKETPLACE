import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to Database URI prefix:", process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 20) + "..." : "undefined");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Mongoose Connection Error:", error.message);
  }
};

export default connectDB;