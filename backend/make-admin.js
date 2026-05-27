import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const makeAllAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB database.");

    const result = await User.updateMany({}, { $set: { role: "admin" } });
    console.log(`Successfully updated ${result.modifiedCount} user(s) to 'admin' role.`);

    const users = await User.find({}, "name email role");
    console.log("Current users in database:", users);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error making users admin:", error);
    process.exit(1);
  }
};

makeAllAdmins();
