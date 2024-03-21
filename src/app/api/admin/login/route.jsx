import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { url } from "@/lib/db";
import { AdminUser } from "@/lib/admin/adminUserModels";

export async function POST(req, res) {
  try {
    // Connect to MongoDB
    await mongoose.connect(url);

    // Check request method
    if (req.method !== "POST") {
      throw new Error("Method Not Allowed");
    }

    // Extract email and password from request body
    const { email, password } = await req.json();

    // Find user by email
    const user = await AdminUser.findOne({ email });

    // Check if user exists
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    // Check if password is valid
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    // Set JWT token as a cookie in the response
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user: user,
    });
    response.cookies.set("adminAuthToken", token, {
      maxAge: 86400, // 1 day in seconds
      // httpOnly: true,
      // domain: "localhost:3000",
      // secure: true, // Uncomment this line if using HTTPS
    });

    // response.Cookies.set("authToken", token, {
    //   maxAge: 86400,
    //   httpOnly: true,
    //   domain: "localhost",
    // });

    return response;
  } catch (error) {
    console.error("Authentication error:", error.message);
    return NextResponse.error(error, { status: 401 });
  } finally {
    // Disconnect from MongoDB after operation
    await mongoose.disconnect();
  }
}
