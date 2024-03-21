import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { url } from "@/lib/db";
import { AdminUser } from "@/lib/admin/adminUserModels";

export async function POST(req, res) {
  try {
    // Connect to MongoDB
    await mongoose.connect(url);

    // Ensure the request method is POST
    if (req.method !== "POST") {
      throw new Error("Method Not Allowed");
    }

    // Extract email, username, and password from the request body
    const { email, username, password } = await req.json();

    // Validate input fields
    if (!username || !email || !password) {
      throw new Error("Username, email, and password are required");
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address");
    }

    // Check if the email is already taken
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      throw new Error("Email already taken");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = await AdminUser.create({
      email,
      username,
      hashedPassword,
    });

    // Close the MongoDB connection
    await mongoose.disconnect();

    // Return success response
    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("User registration error:", error.message);

    // Close the MongoDB connection in case of error
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }

    // Return error response
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
