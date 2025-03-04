import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/user.model";

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to the MongoDB database using your connection string from the environment
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to the database");

    const adminEmail = "admin@gmail.com";
    // Check if an admin user already exists
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("1234$Admin", salt);

      await User.create({
        email: adminEmail,
        password: hashedPassword,
        userType: "admin",
      });
      console.log("Default admin user created successfully.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  } finally {
    // Close the database connection after seeding
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedAdmin();
